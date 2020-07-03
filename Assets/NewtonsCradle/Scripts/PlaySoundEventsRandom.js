// Lista de materiais
var ListSounds : AudioClip[];
var onMouseClickDown = false; // Flag acionar a��o no click do mouse.
var onMouseClickUp = false; // Flag acionar a��o no click do mouse.
var onMouseEnter = false; // Flag acionar a��o quando o mouse entra no objeto.
var onMouseExit = false; // Flag acionar a��o quando o mouse sair no objeto.
var onCollision = false; // Flag acionar a��o na colis�o.
var MagnitudeOnCollision : int = 2;
private var estaTocando = false;

function Start () {
	GetComponent.<AudioSource>().playOnAwake = false;
}

function ApplySound() {
	if(!estaTocando) {
		// Se a lista possui algum material a aplicar... Aplique randomicamente
		if(ListSounds.length>0) {
			GetComponent.<AudioSource>().clip = ListSounds[Random.Range(0, ListSounds.length-1)];
			estaTocando = true;
			// Toca o som
			GetComponent.<AudioSource>().Play();
			// Espera at� o som acabar de tocar, mas libera o processamento 
			// para a engine com o comando "yield"
			yield WaitForSeconds (GetComponent.<AudioSource>().clip.length);
			estaTocando = false;
		}
	}
}

function OnCollisionEnter(collision : Collision) {
	if(onCollision) { 
		if (collision.relativeVelocity.magnitude > MagnitudeOnCollision) {
			ApplySound();
		}
	}
}

function OnMouseEnter () {
	if(onMouseEnter) { 
		ApplySound();
	}
}

function OnMouseExit () {
	if(onMouseExit) { 
		ApplySound();
	}
}

function OnMouseDown () {
	if(onMouseClickDown) { 
		ApplySound();
	}
}

function OnMouseUp () {
	if(onMouseClickUp) { 
		ApplySound();
	}
}
// Adiciona se n�o existir no objeto o componente  AudioSource
@script RequireComponent(AudioSource)
