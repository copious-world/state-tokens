# state-tokens
 
Classes and type definitions for state transition tokens for libraries that manage tokens as objects in sets and tables.

## install

```
npm install -save state-tokens
```


## usage

```
const { 
    TransitionObject, 
    LoginTransitionObject, 
    LogoutTransitionObject, 
    RegistrationTransitionObject, 
    ProcessTransitionObject
} = require("state-tokens")

...

function using_tokens() {

	let lt_object = new LoginTransitionObject('user')  // for user processing
	let pt_object = new ProcessTransitionObject('media') // for media operations
	
	// set the token of the transition object (not a constructor parameter)
	// The token will be useless to most apps if the token is not set.
	let session_token = app_token_maker()
	lt_object.set_token(session_token)
	let process_token= app_token_maker()
	pt_object.set_token(process_token)

	let tok = pt_object.token // fields are public...
}

```



These objects may be stored and fetched by their token key. 

The base type, **TransitionObject**, has fields for identifying its location in a process chain. In particular, the `secondary_action` field can be used to check if the token should do some second action. Within [copious-transitions](https://www.npmjs.com/package/copious-transitions) for example, a browser could check to see if more operations should be performed by a server until an operation is completed; that is, the operation may take a few steps and use server side and client side views of the token to decide how to proceed through a process. 

The token object also has fields `elements`, object, initially empty, and also `amelioritive_action` which if set, may be used to direct the server as to how to handle process error events in relation to other processes or a browser client. 

More information is available in the JSDOC output.





