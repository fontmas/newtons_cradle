var spring = 50.0;
var damper = 5.0;
var drag = 10.0;
var angularDrag = 5.0;
var distance = 0.2;
var attachToCenterOfMass = true;
var onlyDragInX = true;// Only drag an object in X axe
var onlyDragInY = true;// Only drag an object in Y axe
var onlyDragInZ = true;// Only drag an object in Z axe
var mouseBottomLeft = true;// Only drag an object in Y axe
var mouseBottomRight = false;// Only drag an object in Z axe
var mouseBottomMiddle = false;// Only drag an object in Z axe
private var springJoint : SpringJoint;
private var mouseButtom : int;

function Update ()
{ 
	if(mouseBottomLeft) {
		mouseButtom = 0;
		CheckDragAndDrag();  // Se est� configurado para arrastar com o bot�o esquerdo.
	}
	
	if(mouseBottomRight) {
		mouseButtom = 1;
		CheckDragAndDrag(); // Se est� configurado para arrastar com o bot�o direito.
	}
	
	if(mouseBottomMiddle) {
		mouseButtom = 2;
		CheckDragAndDrag(); // Se est� configurado para arrastar com o bot�o do meio.
	}
}

function CheckDragAndDrag()
{
	// Make sure the user pressed the mouse down
	if (!Input.GetMouseButtonDown (mouseButtom))
		return;

	var mainCamera = FindCamera();
	
	// We need to actually hit an object
	var hit : RaycastHit;
	if (!Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),  hit, 100))
		return;
		
	// We need to hit a rigidbody that is not kinematic
	if (!hit.rigidbody || hit.rigidbody.isKinematic)
		return;
	
	if (!springJoint)
	{
		var go = new GameObject("Rigidbody dragger");
		body = go.AddComponent.<Rigidbody>();
		springJoint = go.AddComponent.<SpringJoint>();
		body.isKinematic = true;
	}
	
	springJoint.transform.position = hit.point;
	if (attachToCenterOfMass)
	{
		var anchor = transform.TransformDirection(hit.rigidbody.centerOfMass) + hit.rigidbody.transform.position;
		anchor = springJoint.transform.InverseTransformPoint(anchor);
		springJoint.anchor = anchor;
	}
	else
	{
		springJoint.anchor = Vector3.zero;
	}
	
	springJoint.spring = spring;
	springJoint.damper = damper;
	springJoint.maxDistance = distance;
	springJoint.connectedBody = hit.rigidbody;
	StartCoroutine("DragObject",hit.distance);
}

function DragObject (distance : float)
{
	var oldDrag = springJoint.connectedBody.drag;
	var oldAngularDrag = springJoint.connectedBody.angularDrag;
	springJoint.connectedBody.drag = drag;
	springJoint.connectedBody.angularDrag = angularDrag;
	var mainCamera = FindCamera();
	while (Input.GetMouseButton (mouseButtom))
	{
		var ray = mainCamera.ScreenPointToRay (Input.mousePosition);
		var vectorTemp : Vector3 = ray.GetPoint(distance);
		if(!onlyDragInX) vectorTemp = Vector3(springJoint.transform.position.x,vectorTemp.y,vectorTemp.z);
		if(!onlyDragInY) vectorTemp = Vector3(vectorTemp.y,springJoint.transform.position.y,vectorTemp.z);
		if(!onlyDragInZ) vectorTemp = Vector3(vectorTemp.x,vectorTemp.y,springJoint.transform.position.z);
		springJoint.transform.position = vectorTemp;
		yield;
	}
	if (springJoint.connectedBody)
	{
		springJoint.connectedBody.drag = oldDrag;
		springJoint.connectedBody.angularDrag = oldAngularDrag;
		springJoint.connectedBody = null;
	}
}

function FindCamera ()
{
	if (GetComponent.<Camera>())
		return GetComponent.<Camera>();
	else
		return Camera.main;
}