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

  @ViewChild('localVideo', { static: true }) localVideoElement:
    | HTMLVideoElement
    | undefined;

  @ViewChild('remoteVideo', { static: true }) remoteVideoElement:
    | HTMLVideoElement
    | undefined;

  @ViewChild('remote2Video', { static: true }) remote2VideoElement:
    | HTMLVideoElement
    | undefined;

  @ViewChild('videoTest', { static: true }) videoTestElement:
    | HTMLVideoElement
    | undefined;

  @ViewChild('videoGrid', { static: true }) videoGrid:
    | HTMLDivElement
    | undefined;

  @Input() username: string = '';

  @Input() projectUniqueName: string = '';

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

  public localVideoSrcObject: MediaStream | null = null;

  public remoteVideoSrcObject: MediaStream | null = null;

  public remote2VideoSrcObject: MediaStream | null = null;

  public otherUser: string | null = null;

  constructor(
    private socketVideoService: SocketVideoService,
    private renderer: Renderer2,
    private cameraCallInitService: CameraCallInitService
  ) {}

  ngOnInit(): void {
    //this.myUsername = this.username;
    this.cameraCallInitService.cameraCallIsLive$.subscribe(
      (projectUniqueName) => {
        if (projectUniqueName !== '') {
          this.myUsername = this.username;
          this.initCameraListeners();
          this.call(projectUniqueName);
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
    this.socketVideoService.listenNewCall().subscribe((data: any) => {
      // person that is called
      console.log(data);
      this.otherUser = data.caller;
      this.remoteRTCMessage = data.rtcMessage;
      console.log('answer element');
      console.log(this.answerElement);
      console.log(this.answerElement?.nativeElement.display);
      this.renderer.setStyle(
        this.answerElement?.nativeElement,
        'display',
        'block'
      );
      console.log(this.answerElement?.nativeElement.display);
    });

    this.socketVideoService
      .listenCallAnswered()
      .subscribe((data: { callee: string; rtcMessage: any[] }) => {
        // person that call
        console.log(data);
        // set le remoteRTC Message dans une RTCSessionDescription
        data.rtcMessage.forEach((element: any) => {
          this.remoteRTCMessage = element;
          this.peerConnection.setRemoteDescription(
            new RTCSessionDescription(this.remoteRTCMessage)
          );
        });
        /*this.remoteRTCMessage = data.rtcMessage;
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(this.remoteRTCMessage)
      );*/

        this.renderer.setStyle(
          this.callingElement?.nativeElement,
          'display',
          'none'
        );
        console.log('Call Started. They Answered');
        this.callProgress();
      });

    this.socketVideoService.listenCallIceCandidate().subscribe((data: any) => {
      console.log('Got ice candidate');
      console.log(data);
      const message = data.rtcMessage;
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      console.log('candidate');
      console.log(candidate);
      if (this.peerConnection) {
        console.log('ICE candidate Added');
        console.log(this.peerConnection);
        this.peerConnection.addIceCandidate(candidate);
      } else {
        console.log('ICE candidate Pushed');
        this.iceCandidatesFromCaller.push(candidate);
      }
    });
  }

  public handleCall() {
    this.call(this.myUsername);
    //this.call('jean-12');
  }

  public call(username: string) {
    console.log('call ' + username);
    this.otherUser = username;
    this.beReady().then((bool) => {
      console.log('dans le process call');
      this.processCall(username);
    });
  }

  public handleAnswer() {
    console.log('go in handleAnswer');
    this.beReady().then((bool) => {
      this.processAccept();
    });
    if (this.answerElement) this.answerElement.nativeElement.display = 'none';
    this.renderer.setStyle(
      this.answerElement?.nativeElement,
      'display',
      'none'
    );
  }

  private createPeerConnection() {
    try {
      console.log('avant rtc peer connection');
      this.peerConnection = new RTCPeerConnection(this.pdConfig);
      this.peerConnection.onicecandidate = this.handleIceCandidate.bind(this);
      this.peerConnection.onaddstream = this.handleRemoteStreamAdded.bind(this);
      this.peerConnection.onremovestream =
        this.handleRemoteStreamRemoved.bind(this);
      console.log('Created RTCPeerConnnection');
      return;
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ' + e.message);
      alert('Cannot create RTCPeerConnection object.');
      return;
    }
  }

  private createConnectionAndAddStream() {
    console.log('createConnectionAndAddStream');
    this.createPeerConnection();
    console.log('peerConnection');
    this.peerConnection.addStream(this.localStream);
    console.log('after peerConnection');
    return true;
  }

  private async beReady(): Promise<void | boolean> {
    console.log('on passe dans le be ready');
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
      console.log(this.localVideoElement);
      this.addVideoElement(this.localStream);

      console.log('on passe dans le be ready');
      return this.createConnectionAndAddStream();
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
    // create element video last cgild of the div

    this.remoteStream = event.stream;
    console.log('je set le stream remote');
    console.log(this.remoteStream);
    console.log(this.remoteVideoElement);
    this.addVideoElement(this.remoteStream);
  }

  private handleRemoteStreamRemoved(event: any) {
    console.log('Remote stream removed. Event: ', event);
    if (this.remoteVideoElement) this.remoteVideoSrcObject = null;
    if (this.localVideoElement) this.localVideoSrcObject = null;
  }

  private stop() {
    this.localStream.getTracks().forEach((track: any) => track.stop());
    this.callInProgress = false;
    this.peerConnection.close();
    this.peerConnection = null;
    this.otherUser = null;
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

  ngOnDestroy(): void {
    if (this.callInProgress) {
      this.stop();
    }
  }

  public processCall(userName: string) {
    this.peerConnection.createOffer(
      (sessionDescription: any) => {
        this.peerConnection.setLocalDescription(sessionDescription);
        this.sendCall({
          name: this.otherUser,
          rtcMessage: sessionDescription
        });
      },
      (error: any) => {
        console.log('Error');
      }
    );
  }

  public processAccept() {
    console.log('process accept');
    this.peerConnection.setRemoteDescription(
      new RTCSessionDescription(this.remoteRTCMessage)
    );
    this.peerConnection.createAnswer(
      (sessionDescription: any) => {
        this.peerConnection.setLocalDescription(sessionDescription);
        console.log('processAccept avant iceCandidatesFromCaller');
        if (this.iceCandidatesFromCaller.length > 0) {
          for (let i = 0; i < this.iceCandidatesFromCaller.length; i++) {
            //
            const candidate = this.iceCandidatesFromCaller[i];
            console.log('ICE candidate Added From queue');
            try {
              this.peerConnection
                .addIceCandidate(candidate)
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
          caller: this.otherUser,
          rtcMessage: sessionDescription
        });
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

  private addVideoElement(stream: any) {
    const video = this.renderer.createElement('video');
    this.renderer.setAttribute(video, 'autoplay', 'true');
    this.renderer.addClass(video, 'video-client');
    video.srcObject = stream;
    document.getElementById('video-grid')?.appendChild(video);
  }
}
