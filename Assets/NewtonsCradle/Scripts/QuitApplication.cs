using UnityEngine;
using System.Collections;

public class QuitApplication : MonoBehaviour {

    public bool doByEscape = true;

	void Update () {
		if (doByEscape && Input.GetKeyDown (KeyCode.Escape)) {
			Application.Quit();
		}
	}

    public void DoQuitGame()
    {
        Application.Quit();
    }
}
