var RelativeEndPoint : Vector3;
private var fixedVector : Vector3;
@script RequireComponent (LineRenderer)
function Start() {
	fixedVector = gameObject.transform.position + RelativeEndPoint;
	gameObject.GetComponent("LineRenderer").SetVertexCount(2);
}
function Update () {
	gameObject.GetComponent("LineRenderer").SetPosition(0,gameObject.transform.position);
	gameObject.GetComponent("LineRenderer").SetPosition(1,fixedVector);
}