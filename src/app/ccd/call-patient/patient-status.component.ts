import { ToastrService } from 'ngx-toastr';
import { CcdService } from './../ccd.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-patient-status',
  templateUrl: './patient-status.component.html',
  styleUrls: ['./patient-status.component.css']
})
export class PatientStatusComponent implements OnInit {
  statusOfCallForm: FormGroup
  Patientdata: any;
  callDetails: any;
  viewDetail: any;
  callStatus: string;
  div1: boolean = true;
  div2: boolean = false;
  div3: boolean = false;
  pickedUpDiv: any
  disconnectDiv: any
  noNetworkDiv: any
  p: number = 1;



  // PEERJS WEB-RTC
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
  hospitalizeDiv: any
  deathDiv: any;
  isolationDiv: any;
  getTodayDate: any
  patientPeerId: string;
  statusOfPatient: any;
  constructor(
    private service: CcdService, 
    private router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {

    this.pickedUpDiv = document.getElementById('pickedUp')
    this.disconnectDiv = document.getElementById('disconnectDiv')
    this.noNetworkDiv = document.getElementById('noNetworkDiv')

     
    this.service.getTodayDate().subscribe((result) => {
      this.getTodayDate = formatDate(result.date, 'yyyy-MM-dd', 'en_US');
    })


    this.statusOfCallForm = new FormGroup({

      visited: new FormControl('', Validators.required),
      dateOfVisit: new FormControl(''),
      timeOfVisit: new FormControl(''),
      statusOfHealth: new FormControl(''),
      remark: new FormControl(''),


    })
    this.service.getPatientListWithStatus().subscribe((result) => {
      this.Patientdata = JSON.parse(JSON.stringify(result))
    });
    this.viewDetail = {};



    // PEERJS
    // this.lastPeerId = null;
    // this.peer = null; // own peer object
    // this.conn = null;

    // this.cueString = "<span class=\"cueMsg\">Cue: </span>";
    // this.callButton = document.getElementById("call");
    // this.rVideo = document.getElementById('Rvideo')
    // this.iVideo = document.getElementById('Ivideo')

    // this.peer = new Peer(null, { debug: 2 });

    // this.peer.on('open', (id) => {
    //     // Workaround for peer.reconnect deleting previous id
    //     if (this.peer.id === null) {
    //         console.log('Received null id from peer open');
    //         this.peer.id = this.lastPeerId;
    //     } else {
    //       this.lastPeerId = this.peer.id;
    //     }
    //     console.log('ID: ' + this.peer.id);
    // });

    // this.peer.on('connection', (c) => {
    //     // Disallow incoming connections
    //     c.on('open', () => {
    //         c.send("Sender does not accept incoming connections");
    //         setTimeout(() => { c.close(); }, 500);
    //     });
    // });


    // this.peer.on('disconnected', () => {
    //   this.status.innerHTML = "Connection lost. Please reconnect";
    //     console.log('Connection lost. Please reconnect');
    //     // Workaround for peer.reconnect deleting previous id
    //     this.peer.id = this.lastPeerId;
    //     this.peer._lastServerId = this.lastPeerId;
    //     this.peer.reconnect();
    // });

    // this.peer.on('close', () => {
    //   this.conn = null;
    //   this.status.innerHTML = "Connection destroyed. Please refresh";
    //     console.log('Connection destroyed');
    // });

    // this.peer.on('error', (err) => {
    //     console.log(err);
    //     alert('' + err);
    // });

  }
  alldataShow() {
    this.service.getPatientListWithStatus().subscribe((result) => {
      this.Patientdata = JSON.parse(JSON.stringify(result))
    });
    this.viewDetail = {};
  }
  back() {
    this.div1 = true;
    this.div2 = false;
  }
  viewPatientsDetail(x: any) {
    this.viewDetail = x;
    this.div2 = true;
    this.div1 = false;
  }
  callHistoryDetails(x: any) {
    // this.viewDetail = x;
    // console.log(this.viewDetail)
    this.service.getCallHisoryDetails(x).subscribe((result) => {
      this.callDetails = JSON.parse(JSON.stringify(result))
  });
  this.alldataShow();
  }

  pickedUp() {
    this.noNetworkDiv.style.border = 'solid 2px white'
    this.disconnectDiv.style.border = 'solid 2px white'
    this.pickedUpDiv.style.border = 'solid 2px grey'
    this.div3 = true;
    this.callStatus = 'pickedUp'
  }
  actionModalDetail(x: any) {
    this.viewDetail = x;
    this.noNetworkDiv.style.border = 'solid 2px white'
    this.disconnectDiv.style.border = 'solid 2px white'
    this.pickedUpDiv.style.border = 'solid 2px white'
    this.statusOfCallForm.patchValue(
      {
        visited: '',
        dateOfVisit: '',
        timeOfVisit: '',
        statusOfHealth: '',
        remark: ''
      })
    this.div3 = false;

  }
  
   
hospitalize() {
  this.hospitalizeDiv = document.getElementById('hospitalize')
  this.deathDiv = document.getElementById('death')
  this.isolationDiv = document.getElementById('isolation')
  this.isolationDiv.style.border = 'solid 2px white'
  this.hospitalizeDiv.style.border = 'solid 2px grey'
  this.deathDiv.style.border = 'solid 2px white'
  this.div3 = true;
  this.statusOfPatient = 'hospitalize'
}
isolation() {
  this.hospitalizeDiv = document.getElementById('hospitalize')
  this.deathDiv = document.getElementById('death')
  this.isolationDiv = document.getElementById('isolation')
  this.isolationDiv.style.border = 'solid 2px grey'
  this.hospitalizeDiv.style.border = 'solid 2px white'
  this.deathDiv.style.border = 'solid 2px white'
  this.statusOfPatient = 'isolation'
}
death() {
  this.hospitalizeDiv = document.getElementById('hospitalize')
  this.deathDiv = document.getElementById('death')
  this.isolationDiv = document.getElementById('isolation')
  this.isolationDiv.style.border = 'solid 2px white'
  this.hospitalizeDiv.style.border = 'solid 2px white'
  this.deathDiv.style.border = 'solid 2px grey'
  this.div3 = true;
  this.statusOfPatient = 'death'
}
statusOfCall() {
  if(this.callStatus){
    let data = this.statusOfCallForm.value
    data.patientId = this.viewDetail.patientId
    data.patientSNo = this.viewDetail.patientSNo
    data.age = this.viewDetail.age
    data.gender = this.viewDetail.gender
    data.mobileno = this.viewDetail.mobileno
    data.paitientName = this.viewDetail.patientName
    data.callStatus = this.callStatus
    data.statusOfPatient = this.statusOfPatient
    this.service.addStatusOfCallData(data).subscribe(result => {
      this.alldataShow();
      this.toastr.success(result.message)
    }, error => console.error('Error', error));
  }
  else{
    alert("Please Choose Status of call")
  }
 

}

  diconnected() {
    this.noNetworkDiv.style.border = 'solid 2px white'
    this.disconnectDiv.style.border = 'solid 2px grey'
    this.pickedUpDiv.style.border = 'solid 2px white'

    this.div3 = false;
    this.statusOfCallForm.patchValue(
      {
        visited: '',
        dateOfVisit: '',
        timeOfVisit: '',
        statusOfHealth: '',
        remark: ''
      })
    this.callStatus = 'disConnected'

  }
  noNetwork() {
    this.noNetworkDiv.style.border = 'solid 2px grey'
    this.disconnectDiv.style.border = 'solid 2px white'
    this.pickedUpDiv.style.border = 'solid 2px white'

    this.div3 = false;
    this.statusOfCallForm.patchValue(
      {
        visited: '',
        dateOfVisit: '',
        timeOfVisit: '',
        statusOfHealth: '',
        remark: ''
      })
    this.callStatus = 'noNetwork'
  }

  showPatientHealthReport(patientId: string) {
    this.router.navigate(['/ccd/patientHealthReport'], { queryParams: { patientId: patientId } } );
  }
  videoCall(patientId: string) {
    this.router.navigate(['/ccd/videoCall'], { queryParams: { patientId: patientId } })
  }






  
// PEERJS
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
