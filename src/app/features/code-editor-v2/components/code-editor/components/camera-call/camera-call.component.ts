import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  Input
} from '@angular/core';
import { SocketVideoService } from '../../../../services/socket-video.service';
import { CameraCallInitService } from '../../../../services/camera-call/camera-call-init.service';
import { addUserToMap } from './camera-call.utils';

@Component({
  selector: 'app-camera-call',
  templateUrl: './camera-call.component.html',
  styleUrls: ['./camera-call.component.scss']
})
export class CameraCallComponent implements OnInit, OnDestroy {
  @ViewChild('callerName', { static: true }) callerNameElement:
    | ElementRef
    | undefined;

  @ViewChild('calling', { static: false }) callingElement:
    | ElementRef
    | undefined;

  @ViewChild('answer', { static: false }) answerElement: ElementRef | undefined;

  @ViewChild('videoTest', { static: true }) videoTestElement:
    | HTMLVideoElement
    | undefined;

  @ViewChild('videoGrid', { static: true }) videoGrid:
    | HTMLDivElement
    | undefined;

  @Input() username: string = '';

  @Input() projectUniqueName: string = '';

  userToPeerConnection: Map<
    string,
    { peerConnection: any | null; iceCandidateFromCaller: RTCIceCandidate[] }
  > = new Map();

  private pdConfig: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.machavoine.fr' },
      {
        urls: 'turn:turn.machavoine.fr',
        username: 'guest',
        credential: 'pass'
      }
    ]
  };

  private localStream: any;

  private peerConnection: any;

  private remoteStream: any;

  private callInProgress = false;

  private myUsername: any;

  private remoteRTCMessage: any;

  private iceCandidatesFromCaller: RTCIceCandidate[] = [];

  private hasLocalStreamShow = false;

  public otherUser: string = '';

  constructor(
    private socketVideoService: SocketVideoService,
    private renderer: Renderer2,
    private cameraCallInitService: CameraCallInitService
  ) {}

  ngOnInit(): void {
    this.myUsername = this.username;
    this.cameraCallInitService.cameraCallIsLive$.subscribe(
      (projectUniqueName) => {
        if (projectUniqueName !== '') {
          this.myUsername = this.username;
          this.initCameraListeners();
          this.call('pomme');
          this.call('tim');
        }
      }
    );
  }

  public handleValidUsername(username: string) {
    this.myUsername = username;
    this.initCameraListeners();
  }

  private initCameraListeners() {
    this.socketVideoService.connect(this.myUsername, this.projectUniqueName);
    this.socketVideoService
      .listenNewCall()
      .subscribe((data: { caller: string; rtcMessage: any }) => {
        // person that is called
        this.otherUser = data.caller;
        this.remoteRTCMessage = data.rtcMessage;

        //console.log(data);
        //this.remoteRTCMessage = data.rtcMessage;
        console.log('answer element');
        console.log(this.answerElement);
        this.renderer.setStyle(
          this.answerElement?.nativeElement,
          'display',
          'block'
        );
        console.log(this.answerElement?.nativeElement.display);
      });

    this.socketVideoService
      .listenCallAnswered()
      .subscribe((data: { callee: string; rtcMessage: any }) => {
        // person that call
        console.log(data);
        // set le remoteRTC Message dans une RTCSessionDescription
        this.remoteRTCMessage = data.rtcMessage;
        this.logMapUserPeer();
        this.userToPeerConnection
          .get(data.callee)
          ?.peerConnection.setRemoteDescription(
            new RTCSessionDescription(data.rtcMessage)
          );

        this.renderer.setStyle(
          this.callingElement?.nativeElement,
          'display',
          'none'
        );
        console.log('Call Started. They Answered');
        this.callProgress();
      });

    this.socketVideoService
      .listenCallIceCandidate()
      .subscribe((data: { sender: string; rtcMessage: any }) => {
        console.log('Got ice candidate');
        const message = data.rtcMessage;
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        console.log('candidate');
        console.log(candidate);

        if (this.userToPeerConnection.get(data.sender)?.peerConnection) {
          console.log('ICE candidate Added');
          console.log(this.userToPeerConnection.get(data.sender));
          console.log(candidate);
          this.userToPeerConnection
            .get(data.sender)
            ?.peerConnection.addIceCandidate(candidate);
        } else {
          console.log('ICE candidate Pushed');
          if (!this.userToPeerConnection.get(data.sender)) {
            addUserToMap(this.userToPeerConnection, data.sender, null, []);
          }
          console.log(this.userToPeerConnection.get(data.sender));
          this.userToPeerConnection
            .get(data.sender)
            ?.iceCandidateFromCaller.push(candidate);
        }
      });

    this.socketVideoService
      .listenGetAllUsersToJoin()
      .subscribe((users: string[]) => {
        console.log('get all users to join');
        console.log(users);
        users.forEach((user: string) => {
          this.joinExistingUserInChat(user);
        });
      });

    this.socketVideoService
      .listenNewCallByJoin()
      .subscribe((data: { caller: string; rtcMessage: any }) => {
        // person that is called
        console.log();
        this.otherUser = data.caller;
        this.remoteRTCMessage = data.rtcMessage;

        this.handleAnswer(data.caller);
      });

    this.socketVideoService
      .listenUserIsDisconnected()
      .subscribe((data: { user: string }) => {
        console.log('user disconnected');
        console.log(data.user);
        this.deleteVideoElement(data.user);
      });
  }
  public handleCall() {
    this.call(this.myUsername);
    //this.call('jean-12');
  }

  public call(otherUser: string) {
    console.log('call ' + otherUser);
    this.otherUser = otherUser;
    this.beReady(otherUser).then((bool) => {
      console.log('dans le process call');
      this.processCall(otherUser);
      this.logMapUserPeer();
    });
  }

  public handleAnswer(otherUser: string) {
    console.log('go in handleAnswer');
    this.beReady(otherUser).then((bool) => {
      this.processAccept(otherUser);
      this.logMapUserPeer();
    });
    if (this.answerElement) this.answerElement.nativeElement.display = 'none';
    this.renderer.setStyle(
      this.answerElement?.nativeElement,
      'display',
      'none'
    );
  }

  public handleJoinExistingConversation() {
    this.socketVideoService.sendGetUserToJoin({ room: this.projectUniqueName });
  }

  private joinExistingUserInChat(userToJoin: string) {
    console.log('join existing user');
    this.beReady(userToJoin).then((bool) => {
      console.log('dans le process call');
      this.otherUser = userToJoin;
      this.processJoin(userToJoin);
    });
  }

  private processJoin(userToJoin: string) {
    this.userToPeerConnection.get(userToJoin)?.peerConnection.createOffer(
      (sessionDescription: any) => {
        this.userToPeerConnection
          .get(userToJoin)
          ?.peerConnection.setLocalDescription(sessionDescription);
        this.socketVideoService.sendJoinConversation({
          name: userToJoin,
          rtcMessage: sessionDescription
        });
        this.otherUser = userToJoin;
      },
      (error: any) => {
        console.log('Error');
      }
    );
  }

  private createPeerConnection(username: string) {
    try {
      console.log('avant rtc peer connection');
      const peerConnection = new RTCPeerConnection(this.pdConfig) as any;
      peerConnection.onicecandidate = this.handleIceCandidate.bind(this);
      peerConnection.onaddstream = this.handleRemoteStreamAdded.bind(this);
      peerConnection.onremovestream = this.handleRemoteStreamRemoved.bind(this);
      if (this.userToPeerConnection.has(username)) {
        // @ts-ignore
        this.userToPeerConnection.get(username).peerConnection = peerConnection;
      } else {
        addUserToMap(this.userToPeerConnection, username, peerConnection, []);
      }
      this.logMapUserPeer();
      console.log('Created RTCPeerConnnection');
      return;
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ' + e.message);
      alert('Cannot create RTCPeerConnection object.');
      return;
    }
  }

  private createConnectionAndAddStream(username: string) {
    console.log('createConnectionAndAddStream');
    this.createPeerConnection(username);
    console.log('peerConnection');
    this.userToPeerConnection
      .get(username)
      ?.peerConnection.addStream(this.localStream);
    this.logMapUserPeer();
    //this.peerConnection.addStream(this.localStream);
    console.log('after peerConnection');
    return true;
  }

  private async beReady(otherUser: string): Promise<void | boolean> {
    console.log('on passe dans le be ready ' + otherUser);
    console.log(navigator.mediaDevices);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });

    console.log('après le stream');

    try {
      this.localStream = stream;
      console.log(this.localStream);
      console.log('localVideo');
      console.log('je set le stream');
      console.log(stream);
      if (!this.hasLocalStreamShow) {
        this.addLocalVideoElement(this.localStream, this.myUsername);
        this.hasLocalStreamShow = true;
      }

      console.log('on passe dans le be ready');
      return this.createConnectionAndAddStream(otherUser);
    } catch (e) {
      console.log(e);
      alert('getUserMedia() error: ' + e.name);
    }
  }

  private handleIceCandidate(event: any) {
    // console.log('icecandidate event: ', event);
    console.log('on arrive dans handleIceCandidate');
    if (event.candidate) {
      console.log('Local ICE candidate');
      // console.log(event.candidate.candidate);

      this.sendICEcandidate({
        user: this.otherUser,
        rtcMessage: {
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        }
      });
    } else {
      console.log('End of candidates.');
    }
  }

  private handleRemoteStreamAdded(event: any) {
    console.log('Remote stream added.');
    console.log(event);
    // create element video last cgild of the div

    this.remoteStream = event.stream;
    console.log('je set le stream remote');
    console.log(this.remoteStream);
    this.addVideoElement(this.remoteStream, this.otherUser);
  }

  private handleRemoteStreamRemoved(event: any) {
    console.log('Remote stream removed. Event: ', event);
  }

  private stop() {
    this.localStream.getTracks().forEach((track: any) => track.stop());
    this.callInProgress = false;
    this.userToPeerConnection.forEach(
      (peerConnection: {
        peerConnection: any | null;
        iceCandidateFromCaller: RTCIceCandidate[];
      }) => {
        peerConnection.peerConnection.close();
        this.renderer.setStyle(
          this.answerElement?.nativeElement,
          'display',
          'none'
        );
        this.renderer.setStyle(
          this.callingElement?.nativeElement,
          'display',
          'none'
        );
      }
    );
  }

  ngOnDestroy(): void {
    if (this.callInProgress) {
      this.stop();
    }
    this.socketVideoService.sendDisconnectEvent();
  }

  public processCall(otherUser: string) {
    this.userToPeerConnection.get(otherUser)?.peerConnection.createOffer(
      (sessionDescription: any) => {
        this.userToPeerConnection
          .get(otherUser)
          ?.peerConnection.setLocalDescription(sessionDescription);
        this.sendCall({
          name: otherUser,
          rtcMessage: sessionDescription
        });
      },
      (error: any) => {
        console.log('Error');
      }
    );
  }

  public processAccept(otherUser: string) {
    console.log('process accept');
    this.userToPeerConnection
      .get(otherUser)
      ?.peerConnection.setRemoteDescription(
        new RTCSessionDescription(this.remoteRTCMessage)
      );

    this.userToPeerConnection.get(otherUser)?.peerConnection.createAnswer(
      (sessionDescription: any) => {
        this.userToPeerConnection
          .get(otherUser)
          ?.peerConnection.setLocalDescription(sessionDescription);
        console.log('processAccept avant iceCandidatesFromCaller');
        if (this.iceCandidatesFromCaller.length > 0) {
          for (let i = 0; i < this.iceCandidatesFromCaller.length; i++) {
            //
            const candidate = this.iceCandidatesFromCaller[i];
            console.log('ICE candidate Added From queue');
            try {
              this.userToPeerConnection
                .get(otherUser)
                ?.peerConnection.addIceCandidate(candidate)
                .then((done: any) => {
                  console.log(done);
                })
                .catch((error: any) => {
                  console.log(error);
                });
            } catch (error: any) {
              console.log(error);
            }
          }
          this.iceCandidatesFromCaller = [];
          console.log('ICE candidate queue cleared');
        } else {
          console.log('NO Ice candidate in queue');
        }
        this.answerCall({
          caller: otherUser,
          rtcMessage: sessionDescription
        });
        this.otherUser = otherUser;
      },
      (error: any) => {
        console.log('Error');
      }
    );
  }

  private answerCall(data: any) {
    this.socketVideoService.sendAnswerCall(data);
    this.callProgress();
  }

  private sendCall(data: any) {
    console.log('Send Call');
    this.renderer.setStyle(
      this.callingElement?.nativeElement,
      'display',
      'block'
    );
    this.socketVideoService.sendCall(data);
  }

  private sendICEcandidate(data: any) {
    console.log('Send ICE candidate');
    this.socketVideoService.sendIceCandidate(data);
  }

  private callProgress() {
    this.callInProgress = true;
  }

  private addLocalVideoElement(stream: any, username: string) {
    const video = this.renderer.createElement('video');
    const icon = this.renderer.createElement('mat-icon');
    const div = this.renderer.createElement('div');
    const iconText = this.renderer.createText('call_end');
    this.renderer.addClass(div, 'div-video');
    this.renderer.setAttribute(video, 'autoplay', 'true');
    this.renderer.addClass(video, 'video-client');
    this.renderer.addClass(video, username);
    video.srcObject = stream;
    this.renderer.addClass(icon, 'icon-video');
    this.renderer.addClass(icon, 'mat-icon');
    this.renderer.addClass(icon, 'material-icons');
    icon.addEventListener('click', () => {
      this.deleteVideoElement(username);
      this.renderer.setStyle(icon, 'display', 'none');
      this.renderer.setStyle(
        document.getElementById('video-grid'),
        'display',
        'none'
      );
      this.stop();
      this.socketVideoService.sendDisconnectEvent();
    });
    div.appendChild(video);
    icon.appendChild(iconText);
    div.appendChild(icon);
    document.getElementById('video-grid')?.appendChild(div);
  }

  private addVideoElement(stream: any, username: string) {
    const video = this.renderer.createElement('video');
    this.renderer.setAttribute(video, 'autoplay', 'true');
    this.renderer.addClass(video, 'video-client');
    this.renderer.addClass(video, username);
    video.srcObject = stream;
    document.getElementById('video-grid')?.appendChild(video);
  }

  private deleteVideoElement(username: string) {
    const video = document.getElementsByClassName(username)[0];
    console.log(video);
    if (video) this.renderer.setStyle(video, 'display', 'none');
  }

  private logMapUserPeer(user?: string) {
    console.log('log map user peer');
    if (!user) console.log(this.userToPeerConnection);
    if (user) {
      console.log(this.userToPeerConnection.get(user));
    }
  }
}
