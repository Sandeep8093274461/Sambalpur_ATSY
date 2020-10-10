import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  feedBackForm: FormGroup;
  sosForm: FormGroup;
  div2: boolean = true;
  div3: boolean = false;
  div4: boolean = false;
  
  rrTeamVisited: string;
  medicalKit: string;
  healthToday: string;

  toggle = true;
  status = 'Enable';
  pickedUpDiv: any
  disconnectDiv: any
  sessionValues: any;



  lastPeerId: any = null;
  peer: any = null; // Own peer object
  peerId: any = null;
  conn: any = null;
  // recvId: any;
  // pstatus: any;
  rVideo: any;
  iVideo: any;
  localstream: any;
  // display='none';
  constructor(private view: PatientService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.sessionValues = {
      // patientId: localStorage.getItem('patientId')
      patientId: 'P123'
    }
    this.pickedUpDiv = document.getElementById('yes')
    this.feedBackForm = new FormGroup({
      patientId: new FormControl(this.sessionValues.patientId, [Validators.required])
    })
    this.sosForm = new FormGroup({
      patientId: new FormControl(this.sessionValues.patientId, [Validators.required]),
      emergencyMessage: new FormControl('', Validators.required)
    })
    this.rVideo = document.getElementById('Rvideo')
    this.iVideo = document.getElementById('Ivideo')


    // this.peer = new Peer(null, { debug: 2 });

  // this.peer.on('open', (id) => {
  //     // Workaround for peer.reconnect deleting previous id
  //     if (this.peer.id === null) {
  //         this.peer.id = this.lastPeerId;
  //     } else {
  //       this.lastPeerId = this.peer.id;
  //     }

  //     this.updatePeerId(this.peer.id);
  //     // console.log('ID: ' + this.peer.id);
  //     // this.recvId.innerHTML = "ID: " + this.peer.id;
  //     // this.pstatus.innerHTML = "Awaiting connection...";
  // });

  
  // this.peer.on('connection', (c) => {
  //     // Allow only a single connection
  //     if (this.conn && this.conn.open) {
  //         c.on('open', () => {
  //             c.send("Already connected to another client");
  //             setTimeout( () => { c.close(); }, 500);
  //         });
  //         return;
  //     }

  //     this.conn = c;
  //     // console.log("Connected to: " + this.conn.peer);
  //     // this.pstatus.innerHTML = "Connected";

  // });


  // this.peer.on('disconnected', () => {
  //   // this.pstatus.innerHTML = "Connection lost. Please reconnect";
  //     // console.log('Connection lost. Please reconnect');

  //     // Workaround for peer.reconnect deleting previous id
  //     this.peer.id = this.lastPeerId;
  //     this.peer._lastServerId = this.lastPeerId;
  //     this.peer.reconnect();
  // });

  // this.peer.on('close', () => {
  //   this.conn = null;
  //   // this.pstatus.innerHTML = "Connection destroyed. Please refresh";
  //     console.log('Connection destroyed');
  // });

  // this.peer.on('error', (err)=> {
  //     console.log(err);
  //     alert('' + err);
  // });


  // if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
  //   const constraints = {
  //     video: {
  //       facingMode: "environment",
  //       width: { ideal: 320 },
  //       height: { ideal: 320 }
  //     }
  //   };
  //   this.peer.on('call', (call) => {
  //     this.display='block';
  //     navigator.mediaDevices.getUserMedia(constraints).then( (stream: any ) => {
  //       this.localstream = stream;
  //       call.answer(stream); 
  //       call.on('stream', (remoteStream) => {
  //           this.iVideo.srcObject= stream;
  //           this.rVideo.srcObject= remoteStream; 
  //           console.log("Connected to: " + this.conn.peer);
  //           // this.pstatus.innerHTML = "Connected";
  //       });
  //     }).catch(error => console.error(error, 'Camera error.'));

  //   });
      
  //   } else {
  //     console.error('Sorry, Camera not found.');
  //   }


  }


  pickedUp() {
    console.log("ji")
    console.log("disconnectDiv")

  }
  clickToWin() {
    this.div2 = true;
    this.div3 = false;
    this.div4 = false;

  }
  back2() {
    this.div2 = true;
    this.div3 = false;
    this.div4 = false;
    console.log('called')
  }
  feedBack() {
    this.div2 = false;
    this.div3 = true;
    this.div4 = false;
  }
  sos() {
    this.div2 = false;
    this.div4 = true;
    this.div3 = false;
  }
  rrTeamVisitedYes() {
    this.rrTeamVisited = 'Yes'
  }

  rrTeamVisitedNo() {
    this.rrTeamVisited = 'No'
  }
  rcvdmedicalKitYes() {
   this.medicalKit = 'yes'
  }

  rcvdmedicalKitNo() {
    this.medicalKit = 'No'
  }
  

  healthTodayGood() {
   this.healthToday= 'Good'
  }
  healthTodayDiscomfort() {
    this.healthToday= 'Discomfort'
  }
  healthTodayBad() {
    this.healthToday= 'Bad'
  }

  healthTodayVeryBad() {
    this.healthToday= 'Very bad'
  }
  feedBackSubmit(){
    let data = this.feedBackForm.value
    data.rrTeamVisited = this.rrTeamVisited;
    data.medicalKit = this.medicalKit;
    data.healthToday = this.healthToday;
    this.view.addFeedback(data).subscribe(result => {
      this.toastr.success('Feedback added sucessfully.');
      this.back2();
    }, error => this.toastr.error(error.error.message, error.status) );
  }
  emergencyMsgSubmit(){
    if(this.sosForm.valid) {
      this.view.addEmergencyMsg(this.sosForm.value).subscribe(result => {      
        this.toastr.success('Emergency mesage send successfully.');
        this.sosForm.patchValue( {
            emergencyMessage: ''
          })
        this.back2();
      }, error => this.toastr.error(error.error.message, error.status) );
    } else {
      this.toastr.error('Please add your message.')
    }
  }


  updatePeerId(peerId: string) {
    console.log(peerId)
    this.view.updatePatientPeerId(this.sessionValues.patientId, peerId).subscribe( result => {
      console.log(result)
    }, error => this.toastr.error(error.error.message, error.status))
  }

}
