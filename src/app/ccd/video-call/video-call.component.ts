import { ToastrService } from 'ngx-toastr';
import { CcdService } from './../ccd.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {


  lastPeerId: any;
  peer: any;
  conn: any;
  recvIdInput: any;
  status: any;
  connectButton: any;
  cueString: any;
  callButton: any;
  rVideo: any;
  iVideo: any;
  patientPeerId: string;
  constructor(
    private route: ActivatedRoute, 
    private service: CcdService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( data => {
      this.getPatientVCId(data.patientId)
    })

    this.lastPeerId = null;
    this.peer = null; // own peer object
    this.conn = null;

    this.cueString = "<span class=\"cueMsg\">Cue: </span>";
    this.callButton = document.getElementById("call");
    this.rVideo = document.getElementById('Rvideo')
    this.iVideo = document.getElementById('Ivideo')

    // this.peer = new Peer(null, { debug: 2 });

    this.peer.on('open', (id) => {
        // Workaround for peer.reconnect deleting previous id
        if (this.peer.id === null) {
            console.log('Received null id from peer open');
            this.peer.id = this.lastPeerId;
        } else {
          this.lastPeerId = this.peer.id;
        }
        console.log('ID: ' + this.peer.id);
    });

    this.peer.on('connection', (c) => {
        // Disallow incoming connections
        c.on('open', () => {
            c.send("Sender does not accept incoming connections");
            setTimeout(() => { c.close(); }, 500);
        });
    });


    this.peer.on('disconnected', () => {
      this.status.innerHTML = "Connection lost. Please reconnect";
        console.log('Connection lost. Please reconnect');
        // Workaround for peer.reconnect deleting previous id
        this.peer.id = this.lastPeerId;
        this.peer._lastServerId = this.lastPeerId;
        this.peer.reconnect();
    });

    this.peer.on('close', () => {
      this.conn = null;
      this.status.innerHTML = "Connection destroyed. Please refresh";
        console.log('Connection destroyed');
    });

    this.peer.on('error', (err) => {
        console.log(err);
        alert('' + err);
    });
  }


  getPatientVCId(patientId: string) {
    this.service.getPatientVCId(patientId).subscribe( result => {
      console.log(result)
      this.patientPeerId = result.peerId;
      setTimeout(() => {
        this.join();
        this.VideoCaller();
      }, 2000)
    }, error => this.toastr.error(error.error.message, error.status))
  }
  join() {
    // Close old connection
    if (this.conn) {
      this.conn.close();
    }
    // Create connection to destination peer specified in the input field
    this.conn = this.peer.connect(this.patientPeerId, {
        reliable: true
    });

    this.conn.on('open', () => {
      // this.status.innerHTML = "Connected to: " + this.conn.peer;
        console.log("Connected to: " + this.conn.peer);
    });

  };
  VideoCaller() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 320 },
          height: { ideal: 320 }
        }
      };
      navigator.mediaDevices.getUserMedia(constraints).then( (stream: any ) => {
            this.iVideo.srcObject= stream;
            var call = this.peer.call(this.patientPeerId, stream);
            call.on('stream', (remoteStream) => {

              this.rVideo.srcObject = remoteStream;

            });   
      }).catch(error => console.error(error, 'Camera error.'));
      
    } else {
      console.error('Sorry, Camera not found.');
    }
  }

}
