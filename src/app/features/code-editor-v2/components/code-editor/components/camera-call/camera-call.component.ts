import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { SocketVideoService } from '../../../../services/socket-video.service';

@Component({
  selector: 'app-camera-call',
  templateUrl: './camera-call.component.html',
  styleUrls: ['./camera-call.component.scss']
})
export class CameraCallComponent implements OnInit, OnDestroy {
  @ViewChild('callerName', { static: true }) callerNameElement:
    | ElementRef
    | undefined;
  @ViewChild('call', { static: true }) callElement: ElementRef | undefined;
  @ViewChild('answer', { static: true }) answerElement: ElementRef | undefined;

  @ViewChild('localVideo', { static: true }) localVideoElement:
    | HTMLVideoElement
    | undefined;

  @ViewChild('remoteVideo', { static: true }) remoteVideoElement:
    | HTMLVideoElement
    | undefined;

  @ViewChild('videoTest', { static: true }) videoTestElement:
    | HTMLVideoElement
    | undefined;

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

  private otherUser: any;

  private myUsername: any;

  private remoteRTCMessage: any;

  private iceCandidatesFromCaller: RTCIceCandidate[] = [];

  public localVideoSrcObject: MediaStream | null = null;

  public remoteVideoSrcObject: MediaStream | null = null;

  constructor(private socketVideoService: SocketVideoService) {}

  ngOnInit(): void {}

  public handleValidUsername(username: string) {
    this.myUsername = username;
    this.socketVideoService.connect(this.myUsername);
    this.socketVideoService.listenNewCall().subscribe((data: any) => {
      console.log(data);
      this.otherUser = data.caller;
      this.remoteRTCMessage = data.rtcMessage;
    });

    this.socketVideoService.listenCallAnswered().subscribe((data: any) => {
      console.log(data);
      this.remoteRTCMessage = data.rtcMessage;
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(this.remoteRTCMessage)
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
    this.call('jean');
  }

  public call(username: string) {
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
      if (this.localVideoElement) {
        console.log('je set le stream');
        console.log(stream);
        console.log(this.localVideoElement);
        this.localVideoSrcObject = stream;
      }
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
    this.remoteStream = event.stream;
    if (this.remoteVideoElement) {
      console.log('je set le stream remote');
      console.log(this.remoteStream);
      console.log(this.remoteVideoElement);
      this.remoteVideoSrcObject = this.remoteStream;
    }
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
          name: userName,
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
    this.socketVideoService.sendCall(data);
  }

  private sendICEcandidate(data: any) {
    console.log('Send ICE candidate');
    this.socketVideoService.sendIceCandidate(data);
  }

  private callProgress() {
    this.callInProgress = true;
  }
}
