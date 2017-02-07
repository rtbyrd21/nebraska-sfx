

myApp.controller('SketchController', function($scope, $rootScope, $timeout, $state) {

  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
  $scope.modalText = '';


  var a = function(p) {

p.preload = function() {
  
}

var completion;
var vid;
var spacing;
var soundTiles = [];
var soundContOffset;
var sfx = [];
var timeline; 
var progressTracker; 
var soundEffectsList = {};

  p.preload = function(){
    for(var i=0; i < 8; i++){      
      sfx.push(p.loadSound('images/sounds/'+ i +'.mp3'));
    }

  }

	p.setup = function(){
    vid = p.createVideo("images/intro_video.mp4");
    vid.loop();
    vid.hide();
    vid.volume(0);
		canvas = p.createCanvas(p.windowWidth, (p.windowWidth / 16) * 9);
		canvas.parent('sketch-holder');

    var soundContWidth = p.width * .2;
    spacing = soundContWidth / 10;
    soundContOffset = p.width - (p.width * .2) - spacing / 2;

    var timelineHeight = p.height *.2;
    

    timeline = new Timeline(0, p.height - timelineHeight,p.width,timelineHeight);
    progressTracker = new ProgressTracker(0, p.height - timelineHeight, 20);

    var width = soundContWidth / 2 - (spacing);
    var index = 0;
    for(var i=0; i < 2; i++){   
      for(var j=0; j < 4; j++){ 
      soundTiles.push(new SoundTile(((soundContWidth / 2 * i)) + soundContOffset + spacing, ((width + spacing) * (j + 1)) - width, width, width, index, sfx[index]));
      index++;
      }
    }

	}

	p.draw = function() {
    p.image(vid,0,0,p.width *.8,p.height *.8);

    //sound library    
    p.fill(100);
    p.rect(p.width - (p.width * .2), 0, p.width * .2, p.height);
    
    timeline.playTimeline();
    timeline.checkTiles();
    progressTracker.display();
    progressTracker.playSoundEffects();

    for(var i=0; i < soundTiles.length; i++){ 
      soundTiles[i].checkDrag();
      soundTiles[i].playTrack();
      soundTiles[i].checkTimeline();
    }

    

	};

var itemSelected = false;

// Jitter class
function SoundTile(xPos, yPos, width, height, tileIndex, soundEffect) {

  this.xPos = xPos;
  this.yPos = yPos;
  this.startX = xPos;
  this.startY = yPos;
  this.width = width;
  this.height = height;
  this.index = tileIndex;
  this.dragX = xPos;
  this.dragY = yPos;
  this.soundEffect = sfx[this.index];
  this.isPlaying = false;


  this.checkDrag = function(){
    
    if((itemSelected === false || itemSelected === this.index) && (p.mouseX > this.xPos) && (p.mouseX < this.xPos+this.width) && (p.mouseY > this.yPos) && (p.mouseY < this.yPos+this.height)){
      
       p.fill(0);
       p.rect(this.xPos, this.yPos, this.width, this.height);
       if(p.mouseIsPressed){
        itemSelected = this.index;
        this.xPos = p.mouseX - (this.width/2);
        this.yPos = p.mouseY  - (this.height/2);
        p.rect(this.xPos, this.YPos, this.width, this.height);
        p.fill(0);
        p.text(this.index+1, this.xPos, this.yPos);
       }else{
        itemSelected = false;
        this.xPos = this.startX;
        this.yPos = this.startY;      
       }
    }else{

      p.fill(255);
       p.rect(this.xPos, this.yPos, this.width, this.height);
       p.fill(0);
       p.text(this.index+1, this.xPos, this.yPos);
       if(this.isPlaying){
          this.soundEffect.stop();
          this.isPlaying = false;
        }
    }
  }

  this.playTrack = function(){

    if(p.mouseIsPressed){
        this.isPlaying = true;
      }

     if(this.isPlaying){
      if(this.soundEffect.isPlaying()){
      }else{
        // this.soundEffect.play();
      }
      
     }; 
    }

  this.checkTimeline = function(){
    if(this.yPos + this.height > timeline.yPos){
        soundEffectsList[this.index] = {"id": this.index, "xPos":p.mouseX, "soundEffect": this.soundEffect};
      console.log(soundEffectsList);
    }
  }


  }
  

function Timeline(xPos, yPos, width, height){
  this.xPos = xPos;
  this.yPos = yPos;
  this.width = width;
  this.height = height;
  this.soundEffects = {};

  this.playTimeline = function(){
      p.fill(255,0,70);
      p.rect(this.xPos,this.yPos,this.width,this.height);
      // p.fill(255);
      // p.ellipse(completion*this.width, p.height - this.height, 20, 20);
  }

  var log = [];
  var that = this;
  this.checkTiles = function(){

    for(var i=0; i < soundTiles.length; i++){
      if(soundTiles[i].yPos + soundTiles[i].height > this.yPos){
        p.fill(155,0,170);
        p.rect(this.xPos,this.yPos,this.width,this.height);

        // if (soundTiles[i].index in soundEffects){
          // this.soundEffects[soundTiles[i].index] = {"id": soundTiles[i].index, "xPos":p.mouseX, "soundEffect": soundTiles[i].soundEffect};
        // }else{
        //   soundEffects[soundTiles[i].index]
        // }

        // console.log(this.soundEffects);

        // if(!this.soundEffects.length){
        //   this.soundEffects.push(soundTiles[i].index : {"id": soundTiles[i].index, "xPos":p.mouseX, "soundEffect": soundTiles[i].soundEffect});
        //   log.push(soundTiles[i].index);
        // }
        // if(log.indexOf(soundTiles[i].index) > -1){
        //   this.soundEffects.splice(soundEffects.indexOf(),1);
        // }
      }
    }


    // for(var i=0; i < soundTiles.length; i++){ 
    //   if(soundTiles[i].yPos + soundTiles[i].height > this.yPos){
    //     p.fill(155,0,170);
    //     p.rect(this.xPos,this.yPos,this.width,this.height);
          
          
   
    //       if(!log.length){
    //             log.push(soundTiles[i].index);
    //             this.soundEffects.push({"id": soundTiles[i].index, "xPos":p.mouseX, "soundEffect": soundTiles[i].soundEffect});
    //           }

    //        if(log.indexOf(soundTiles[i].index) > -1){
    //          this.soundEffects[soundTiles[i].index] = {"id": soundTiles[i].index, "xPos":p.mouseX, "soundEffect": soundTiles[i].soundEffect};
    //        }else{
    //           log.push(soundTiles[i].index);
    //            this.soundEffects.push({"id": soundTiles[i].index, "xPos":p.mouseX, "soundEffect": soundTiles[i].soundEffect});

    //        }
            
    //       }

          for(key in soundEffectsList){
            p.fill(255);
            var width = p.width / (vid.duration() / soundEffectsList[key].soundEffect.duration());
            // console.log(key);
            p.rect(soundEffectsList[key].xPos, yPos + (soundEffectsList[key].id * 15), width, 15);
          }

        //  this.soundEffects.forEach(function(item, index){
        //   p.fill(255);
        //   var width = p.width / (vid.duration() / item.soundEffect.duration());
        //   p.rect(item.xPos,yPos + (index * 20), width, 20);
        // });


    //   }
    }
  


}

function ProgressTracker(xPos, yPos, diam){
  this.xPos = xPos;
  this.yPos = yPos;
  this.diam = diam;
  this.completion = 0;
  this.isPanning = false;
  this.isPlaying = true;
  
  this.display = function(){
    if(!this.isPanning){
      this.completion = vid.time() / vid.duration();
      this.xPos = p.width * this.completion;
    }
    
    p.fill(255);
    p.ellipse(this.xPos ,this.yPos,this.diam,this.diam);
    if(p.dist(this.xPos, this.yPos, p.mouseX, p.mouseY) < diam + 10){
      if(p.mouseIsPressed){
        this.isPlaying = false;
        vid.pause();
        this.isPanning = true;
        this.xPos = p.mouseX;
        vid.time((p.mouseX/p.width) * vid.duration());
      }else{
        this.isPanning = false;
      }
    }else{
      if(!this.isPlaying){
        this.isPlaying = true;
        vid.play();
      }
    }
  }

  var that = this;
  this.playSoundEffects = function(){
    for(key in soundEffectsList){
      var width = p.width / (vid.duration() / soundEffectsList[key].soundEffect.duration());
      if(this.xPos > soundEffectsList[key].xPos && this.xPos < soundEffectsList[key].xPos + width){
        if(!soundEffectsList[key].soundEffect.isPlaying()){
            soundEffectsList[key].soundEffect.play();
        }

      }

    }
  //   timeline.soundEffects.forEach(function(item,index){
  //     var width = p.width / (vid.duration() / item.soundEffect.duration());
  //     if(that.xPos > item.xPos && that.xPos < item.xPos + width){
  //       if(!item.soundEffect.isPlaying()){
  //         item.soundEffect.play();
  //       }
        
  //     };
  //   });
  }

}


};





	// $timeout(function(){
		var myp5 = new p5(a);
	// }, 1200)
	 

});