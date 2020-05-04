import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return(
			<div>
				<p className='f3'>
					{'Esta Magia detectará rostros en tus fotos. Haz una prueba.'}
				</p>
				<div className='center'>
					<div className='form center pa4 br3 shadow-5'>
						<input className='f4 pa2 w-70 center'  type='tex' onChange={onInputChange}/>					
						<button 
							className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
							onClick={onButtonSubmit} //se añade para que cuando haga click en el botón se ejecute el onButtonSubmit
						>Detectar</button>
					</div>	
				</div>
			</div>
		);
}

export default ImageLinkForm;