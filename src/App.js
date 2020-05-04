import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const app = new Clarifai.App({
 apiKey: 'd9e1748bdd01450cac7ff181c783cae7' //esta es la que se asigna cuando creo la App en la pagina de clarifi (my-first-application)
});


const particlesOptions = {
  particles: {
                number : {
                  value: 100,
                  density: {
                    enable: true,
                    value_area: 800
                  }

                }  
              }
}

class App extends Component {
  //Necesitamos un State para conocer el valor que entró el usuario para que lo recuerde, actualize. Para ello
  //creamos el constructor  
  //route: keeps track de donde estamos en nuestra pagina. Aquí se le dice que comience por signin
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }

  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height); //Number -- convertirlo a numero
    console.log(width,height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)      
      //Aquí vamos a recibir unos valores que luego los pondremos en posiciones de lineas

    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  onInputChange = (event) => {    
    this.setState({input: event.target.value});
  }
//1.1 y 1.2
  onButtonSubmit = () => {
    //Aqui pasamos la url de la imagen de FaceRecognition
    this.setState({imageUrl:this.state.input});  
    app.models
        .predict(   
                  Clarifai.FACE_DETECT_MODEL,
                  this.state.input
                  )
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err)); 
  }

  onRoutChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route}); 
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
      return (
        <div className="App">            
            <Particles className='particles'
                params={particlesOptions}
             />
             <Navigation isSignedIn={isSignedIn} onRoutChange={this.onRoutChange}/>            
             { this.state.route === 'home' 

                ? <div>
                    <Logo />
                    <Rank />
                    <ImageLinkForm onInputChange = {this.onInputChange} 
                                   onButtonSubmit={this.onButtonSubmit} /> 
                    <FaceRecognition box= {box} imageUrl= {imageUrl}/>                           
                  </div>            
                : (
                    this.state.route === 'signin' 
                      ? <SignIn onRoutChange={this.onRoutChange} /> 
                      : <Register onRoutChange={this.onRoutChange} /> 
                  )  
              }
         </div>     
      );
    }
  }

  /*
Recordar

   { this.state.route === 'signin' 
                ? <SignIn /> 
                : <div>.....
     If (xxx === 'tal cosa')  ?(else) 'vemos tal otra' :(en caso contrario) 'vemos o hacemos tal otra'
 
  */

export default App;
