/**
 *
 * @author oracle
 * @version $Id: ScormAPI.js,v 1.2 2012/07/06 10:31:08 ty Exp $
 */

/*
* -----------------------------------------------------------------------------------------------
*  Convenience Methods needed for SCO communication
* -----------------------------------------------------------------------------------------------
*/

var currentScoID = "";
var contentId = "";
var looseChecking ="false";
var isAutoCommit ="true";
var cmiList=0;
var cmiUpdate ="";
var attempt_token = "";

/*
* Top level object to hold complete CMI data model and API methods
*/
function GenericAPIAdaptor(){
	this.cmi = new CMIModel;
	this.LMSInitialize = LMSInitializeMethod;
	this.LMSGetValue = LMSGetValueMethod;
	this.LMSSetValue = LMSSetValueMethod;
	this.LMSCommit = LMSCommitMethod;
	this.LMSFinish = LMSFinishMethod;
	this.LMSGetLastError = LMSGetLastErrorMethod;
	this.LMSGetErrorString = LMSGetErrorStringMethod;
	this.LMSGetDiagnostic = LMSGetDiagnosticMethod;
	this.LMSSetAutoCommit = LMSSetAutoCommitMethod;
	this.LMSGetAutoCommit = LMSGetAutoCommitMethod;
	this.ServerSco = new ServerScoSettings;
}


function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
}
/*
* ---------------------------------------------------------------------------------------------
*	API Javascript Functions
* ---------------------------------------------------------------------------------------------
*/

/*
* LMSInitialize. Initialize this sco (if it is one)
*/
function LMSInitializeMethod(parameter){
    // check that this has been called with an empty string...
	if (parameter != ""){
		this.ServerSco.lastError = "201"
		return "false";
	}
    // check that we are not already initialized...

    if(this.ServerSco.isInitialized == "false")
    {
    	getInit();
    	getAllCmi();
		this.ServerSco.isInitialized = "true";
		this.ServerSco.lastError = "0"
		return "true";
     }
     else{
		this.ServerSco.lastError = "101"
		return "false";
	}
}

/*
* Function to initially load the server model CMI elements into the javascript
* model, when this page first loads.
*/
function getInit()
{
	//slj sendRequest("GetAttemptState\n");
	rstring = this.getParamData;
	//alert("getInit getAttemptStateData : "+rstring);
	if(rstring ==null || rstring =="" || rstring.indexOf("errorCode=0") == -1) 
	{
		API.ServerSco.lastError = "201";
		return null;
	}
	//cmi.suspend_data = 
	return  "";
}

function getAllCmi()
{
	rstring = "";
	//sljsendRequest("GetParam\n");
	rstring = this.getParamData; 
	//alert(" here 1  "+rstring);		
	if(rstring ==null || rstring =="" || rstring.indexOf("errorCode=0") == -1) 
	{
		API.ServerSco.lastError = "201";
		return null;
	}
	var  rs_cmi = rstring.split("\n");
	//alert(" here 2 "+rs_cmi[0]);
	for(i=0,j=0;i<rs_cmi.length;i++)
	{
	  //alert("rs_cmi => "+rs_cmi[i]);
	  if (rs_cmi[i].indexOf("cmi.") <0) continue;
	  var v_cmi =rs_cmi[i].split("=");
	  var v_cmi_ = "";
	  for(var j=1;j<v_cmi.length;j++){
	  	if(v_cmi_==""){
	  		v_cmi_ = v_cmi[j];
	  	}else{
	  		v_cmi_ = v_cmi_ + "=" + v_cmi[j];
	  	}
	  }
	  //alert("v_cmi[0] v_cmi_ => "+v_cmi[0]+" "+v_cmi_);
	  //loadDataIntoModel(v_cmi[0],v_cmi[1]);
	  loadDataIntoModel(v_cmi[0],v_cmi_);
	  cmiList =1;
	}
	return  "";
}
/*
* Function to initially load the server model CMI elements into the javascript
* model, when this page first loads.
*/
function loadDataIntoModel(element, value){
  if (element != "cmi.interactions._count" && element != "cmi.interactions._count"){
        if (element.indexOf("cmi.objectives") != -1){
             dealWithSettingObjectives(element, value);
        }
        else if (element.indexOf("cmi.interactions") != -1){
             dealWithSettingInteractions(element, value);
        }
        else{
           var result = eval ("API."+element);
           if (result != null){
                result.cmivalue = value;
           }
        }
  }
}
/*
* Function to call javascript in hidden frame "LMSUpdate", which gets the
* current state of the cmi datamodel and updates the server model
*/
function updateServer()
{
	//alert("cmiUpdate = "+cmiUpdate);
	if(cmiUpdate ==null || cmiUpdate =="") return;
	var sUpdate=""+cmiUpdate;
	cmiUpdate ="";
	//console.log(sUpdate);
	updateLessonStudyInfo(sUpdate);
	//alert("lesson_status = "+API.LMSGetValue("cmi.core.lesson_status"));
	//slj sendRequest("PutParam\n"+sUpdate);
}

function LMSSetAutoCommitMethod(sCommit)
{
	if(sCommit !="false" ||  sCommit !="true") return;
	isAutoCommit =sCommit;
}

function LMSGetAutoCommitMethod()
{
	return isAutoCommit;
}

/*
*  Object ServerScoSettings()
*  Used to store server specific settings and error codes etc..
*  Is accessed as an object inside this implementation of the API object.
*/
function ServerScoSettings(){
	this.isInitialized = "false";
	this.lastError = "0";
	this.checkDataTypeAndVocab = scoCheckDataTypeAndVocab;
}

/*
* A CMIComponent holds properties for each CMI element in the model.
* Here we keep the element name, it current value, its read/write status
* and finally it CMI datatype
*/
function CMIComponent(thename, thevalue, readstatus, datatype){
	this.cminame=thename;
	this.cmivalue=thevalue;
	this.cmireadStatus=readstatus;
	this.cmidatatype=datatype;
}

/*
* LMSFinish. Finish this sco session.
*/
function LMSFinishMethod(parameter){
    // check that this has been called with an empty string...
	if (parameter != ""){
		this.ServerSco.lastError = "201";
		return "false";
	}
    // make sure that the server is initialized...
	if (this.ServerSco.isInitialized == "true"){
     		this.ServerSco.isInitialized = "false";
			this.ServerSco.lastError = "0";
			return "true";
	}
    else{
		// not initialized
		this.ServerSco.lastError = "301";
		return "false";
	}
}

/*
* LMSCommit.  Method to update/persist any changed items in the CMI datamodel
*/
function LMSCommitMethod(parameter){
    // check that this has been called with an empty string...
    //console.log("call LMSCommitMethod...");
	if (parameter!=""){
		//alert("commit 0");
		this.ServerSco.lastError = "201"
		return "false";
	}
	//alert("commit 1");
	if (this.ServerSco.isInitialized == "true"){
 			updateServer();
 			//alert("commit 2");
			this.ServerSco.lastError = "0";
			return "true";
	}
	else{
		//alert("commit 3");
		// not initialized
		this.ServerSco.lastError = "301";
		return "false";
	}
}

function dealWithGettingObjectives(element){
	// RETURN _CHILDREN
	if (element == "cmi.objectives._children"){
		API.ServerSco.lastError = "0";
		return API.cmi.objectives._children.cmivalue;
	}

	// RETURN _COUNT
	if (element == "cmi.objectives._count"){
		API.ServerSco.lastError = "0";
		return API.cmi.objectives._count.cmivalue;
	}

	// ELSE CHECK THAT THE ELEMENT IS VALID AND HAS AT LEAST 3 PARAMS
	var cmiArray = element.split(".");
	if (cmiArray.length < 3){
		API.ServerSco.lastError = "201";
		return "";
	}

	var theCount = API.cmi.objectives._count.cmivalue;

	// IF 3RD ARG IS NOT A NUMBER THEN THROW ERROR
	// need to check cmiArray[2] to see if its a number
	if (isNaN(cmiArray[2])){
		API.ServerSco.lastError = "401";
		return "";
	}

	// IF ITS A NUMBER MAKE SURE ITS IN THE ARRAY BOUNDS
	if(cmiArray[2] >= theCount){
		// call to array is out of bounds
		API.ServerSco.lastError = "201";
		return "";
	}
	else{	// WEVE GOT TO THE POINT OF VALIDATING cmi.objective.n
		// does this element exist in the objectives array? - sanity check...
		var mystr = "API."+cmiArray[0] + "." + cmiArray[1] + ".objArray(" + cmiArray[2] + ");";
		ans = eval(mystr);
		//if it doesn't exist
		if (ans == null){
			API.ServerSco.lastError = "201";
			return "";
		}
		else{
			// we need to see if the call is asking for a valid element under cmi.objectives.n
			// we can trust the element parameter now to call the following...
			subelementstr = "ans";
			for (i=3;i<cmiArray.length;i++){
				subelementstr = subelementstr + "." + cmiArray[i];
			}

			var objTest = eval(subelementstr);
			if (objTest == null){
				API.ServerSco.lastError = "201";
				return "false";
			}

			subelementstr = subelementstr + ".cmivalue;";
			res = eval(subelementstr);
			if (res == null){
				API.ServerSco.lastError = "201";
				return "";
			}
			else{
				API.ServerSco.lastError = "0";
				return res;
			}
		}
	}
}

function dealWithGettingInteractions(element){
	// RETURN _CHILDREN
	if (element == "cmi.interactions._children"){
		API.ServerSco.lastError = "0";
		return API.cmi.interactions._children.cmivalue;
	}

	// RETURN _COUNT
	if (element == "cmi.interactions._count"){
		API.ServerSco.lastError = "0";
		return API.cmi.interactions._count.cmivalue;
	}

	// ELSE CHECK THAT THE ELEMENT IS VALID AND HAS AT LEAST 3 PARAMS, DOESNT HAVE
	// MORE THAN 6 PARAMS  - IF SO, ITS ILLEGAL
	var cmiArray = element.split(".");
	if (cmiArray.length < 3 || cmiArray.length > 6){
		API.ServerSco.lastError = "201";
		return "";
	}

	var theCount = API.cmi.interactions._count.cmivalue;

	// IF 3RD ARG IS NOT A NUMBER THEN THROW ERROR
	// need to check cmiArray[2] to see if its a number
	if (isNaN(cmiArray[2])){
		API.ServerSco.lastError = "401";
		return "";
	}

	// IF ITS A NUMBER MAKE SURE ITS IN THE ARRAY BOUNDS
	if(cmiArray[2] >= theCount){
		// call to array is out of bounds
		API.ServerSco.lastError = "201";
		return "";
	}
	else{	// WEVE GOT TO THE POINT OF VALIDATING cmi.interactions.n
		// does this element exist in the interactions array? - sanity check...
		//
		// We are checking that 'cmi.interactions.n' exists
		var mystr = "API."+cmiArray[0] + "." + cmiArray[1] + ".intArray(" + cmiArray[2] + ")";
		ans = eval(mystr);
		//if it doesn't exist
		if (ans==null){
			API.ServerSco.lastError = "201";
			return "";
		}
		else{
			// if theres 4 bits to the element path then try to see if object exists
			if (cmiArray.length == 4){
				strleaf = "ans."+ cmiArray[3] + ";";
				var doesLeafExist = eval (strleaf);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "";
				}
				else{
					// NEXT CHECK THAT THIS ELEMENT IS NOT WRITEONLY
					strleafstatus = mystr + "."+ cmiArray[3] + ".cmireadStatus;";
					var leafstatus = eval(strleafstatus);
					if (leafstatus == "writeonly"){
						API.ServerSco.lastError = "404";
						return "";
					}

					// WE CAN NOW TRY TO GET THE FULL OBJECT REFERENCE
					var strleafval = mystr + "."+ cmiArray[3] + ".cmivalue;";
					var leafVal = eval(strleafval);
					if (leafVal == null){
						// IT FAILED AT THE FINAL HURDLE...
						API.ServerSco.lastError = "201";
						return "";
					}
					else{
						API.ServerSco.lastError = "0";
						return leafVal;
					}

				}
			}
			// if theres 5 bits to the element path then try to see if object exists
			if (cmiArray.length == 5){
				// check object exists
				strbranch = "ans."+ cmiArray[3] + ";";
				var doesLeafExist = eval (strbranch);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "";
				}

				// check final object exists in the array list...
				nextstrbranch = "ans."+ cmiArray[3] + "." + cmiArray[4] + ";";
				var doesLeafExist = eval (nextstrbranch);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "";
				}

				// check for write only
				strread = "ans."+ cmiArray[3] + "." + cmiArray[4] + ".cmireadStatus;";
				var isWriteOnly = eval (strread);
				if (isWriteOnly == "writeonly"){
					API.ServerSco.lastError = "404";
					return "";
				}

				// see if value exists
				strleaf = "ans."+ cmiArray[3] + "." + cmiArray[4] + ".cmivalue;";
				var doesLeafExist = eval (strleaf);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "";
				}
				else{
					API.ServerSco.lastError = "0";
					return doesLeafExist;
				}

			}
			// if theres 6 bits to the element path then try to see if object exists
			if (cmiArray.length == 6){
				// check object exists
				strbranch = "ans."+ cmiArray[3];
				var doesBranchExist = eval (strbranch);
				if (doesBranchExist == null){
					API.ServerSco.lastError = "201";
					return "";
				}
				// The fifth argument should be an array reference, so do some checking...

				// IF 5TH ARG IS NOT A NUMBER THEN THROW ERROR
				// need to check cmiArray[4] to see if its a number
				if (isNaN(cmiArray[4])){
					API.ServerSco.lastError = "401";
					return "";
				}

				// check to see if this element has a _count
				// If it hasn't we'll have to throw an error here
				// because we need the correct array index for array #2...
				var theCount = "ans." + cmiArray[3] + "._count.cmivalue;";
				var hasCount = eval(theCount);
				// CANT FIND _COUNT FOR THIS ELEMENT, SO THROW AN ERROR...
				if (hasCount == null){
					API.ServerSco.lastError = "201";
					return "";
				}
				// next need to check to see if array ref is in array bounds
				if(cmiArray[4] >= hasCount || cmiArray[4] < 0){
					// call to array is out of bounds
					API.ServerSco.lastError = "201";
					return "";
				}
				// make sure that array index 4 is either 'objectives' or 'correct_responses'
				if (cmiArray[3] == "objectives"){
					// next check that there is an object here at this array index...
					var arrayIndex2Check = eval("ans." + cmiArray[3] + ".objectivesInteractionArray(" + cmiArray[4] + ")");
					// check for null
					if (arrayIndex2Check == null){
						API.ServerSco.lastError = "201";
						return "";
					}
					else{
						// next check that the last element is valid...
						finalObjectCheck = eval ("arrayIndex2Check." + cmiArray[5]);
						if (finalObjectCheck == null){
							API.ServerSco.lastError = "201";
							return "";
						}
						else{
							// call must be to a valid element in the model so...
							// check it for writeonly...
							isWriteonly = eval ("finalObjectCheck.cmireadStatus");
							if (isWriteonly == "writeonly"){
								API.ServerSco.lastError = "404";
								return "";
							}
							else{
								API.ServerSco.lastError = "0";
								return eval ("finalObjectCheck.cmivalue");
							}
						}
					}
				}
				else if (cmiArray[3] == "correct_responses"){
					// next check that there is an object here at this array index...
					var arrayIndex2Check = eval("ans." + cmiArray[3] + ".correctResponsesInteractionArray(" + cmiArray[4] + ")");
					// check for null
					if (arrayIndex2Check == null){
						API.ServerSco.lastError = "201";
						return "";
					}
					else{
						// next check that the last element is valid...
						finalObjectCheck = eval ("arrayIndex2Check." + cmiArray[5]);
						if (finalObjectCheck == null){
							API.ServerSco.lastError = "201";
							return "";
						}
						else{
							// call must be to a valid element in the model so...
							// check it for writeonly...
							isWriteonly = eval ("finalObjectCheck.cmireadStatus");
							if (isWriteonly == "writeonly"){
								API.ServerSco.lastError = "404";
								return "";
							}
							else{
								API.ServerSco.lastError = "0";
								return eval ("finalObjectCheck.cmivalue");
							}
						}
					}
				}
				else {
					// throw an error becuase 4th arg was not either
					// objectives or correct_responses
					API.ServerSco.lastError = "201";
					return "";
				}
			}
		}
	}
}

function dealWithSettingObjectives(element, value){
	//  _CHILDREN ARE READONLY
	if (element == "cmi.objectives._children"){
		API.ServerSco.lastError = "402";
		return "false";
	}

	//  _COUNT IS READ ONLY
	if (element == "cmi.objectives._count"){
		API.ServerSco.lastError = "402";
		return "false";
	}

	// ELSE CHECK THAT THE ELEMENT IS VALID AND HAS AT LEAST 3 PARAMS
	var cmiArray = element.split(".");
	if (cmiArray.length < 3){
		API.ServerSco.lastError = "201";
		return "false";
	}

	// IF 3RD ARG IS NOT A NUMBER THEN THROW ERROR
	// need to check cmiArray[2] to see if its a number
	if (isNaN(cmiArray[2])){
		API.ServerSco.lastError = "401";
		return "false";
	}


	var theCount = API.cmi.objectives._count.cmivalue;

	// IF ITS A NUMBER MAKE SURE ITS IN THE ARRAY BOUNDS
	if(cmiArray[2] > theCount || cmiArray[2] < 0){
		// call to array is out of bounds
		API.ServerSco.lastError = "201";
		return "false";
	}
	else if(cmiArray[2] == theCount || cmiArray[2]  < theCount){

		//create a new one
		var existingObjectiveHandle = API.cmi.objectives.objArray(cmiArray[2]);
		if (existingObjectiveHandle == null){
			API.ServerSco.lastError = "101";
			return "false";
		}
		else{
			// we need to see if the call is asking for a valid element under cmi.objectives.n
			// we can trust the element parameter now to call the following...
			subelementstr = "existingObjectiveHandle";
			for (i=3;i<cmiArray.length;i++){
				subelementstr = subelementstr + "." + cmiArray[i];
			}

			var objTest = eval(subelementstr);
			if (objTest == null){
				API.ServerSco.lastError = "201";
				return "false";

			}

			var subelementstrWithoutLeaf = subelementstr;
			subelementstr = subelementstr + ".cmireadStatus;";
			res = eval(subelementstr);
			if (res == null){
				API.ServerSco.lastError = "101";
				return "false";
			}
			else{
				if (res == "readonly"){
					API.ServerSco.lastError = "403";
					return "false";
				}
				else{

                    // check the datatype and vocabulary...
                    var datatype = objTest.cmidatatype;
                    res = API.ServerSco.checkDataTypeAndVocab(element, value, datatype);

                    if (res == "true"){
                        // correct datatype...
  			            // WE CAN NOW TRY TO SET THE FULL OBJECT REFERENCE
					    var strleafval = "objTest.cmivalue =\"" + value + "\";";
					    var leafVal = eval(strleafval);
					    if (leafVal == null){
						    // IT FAILED AT THE FINAL HURDLE...
						    API.ServerSco.lastError = "201";
						    return "false";
					   }
					   else{
						    API.ServerSco.lastError = "0";
						    return "true";
					   }
                   }
                   else{
                       // incorrect data type...
			           API.ServerSco.lastError = "405";
                       return "false";
                   }

				}
			}
		}
	}
}

function dealWithSettingInteractions(element, value){
	//  _CHILDREN ARE READONLY
	if (element == "cmi.interactions._children"){
		API.ServerSco.lastError = "402";
		return "false";
	}

	//  _COUNT IS READ ONLY
	if (element == "cmi.interactions._count"){
		API.ServerSco.lastError = "402";
		return "false";
	}

	// ELSE CHECK THAT THE ELEMENT IS VALID AND HAS AT LEAST 3 PARAMS, DOESNT HAVE
	// MORE THAN 6 PARAMS  - ALL ILLEGAL
	var cmiArray = element.split(".");
	if (cmiArray.length < 3 || cmiArray.length > 6){
		API.ServerSco.lastError = "201";
		return "false";
	}

	var theCount = API.cmi.interactions._count.cmivalue;

	// IF 3RD ARG IS NOT A NUMBER THEN THROW ERROR
	// need to check cmiArray[2] to see if its a number
	if (isNaN(cmiArray[2])){
		API.ServerSco.lastError = "401";
		return "false";
	}

	var theCount = API.cmi.interactions._count.cmivalue;

	// IF ITS A NUMBER MAKE SURE ITS IN THE ARRAY BOUNDS
	if(cmiArray[2] > theCount || cmiArray[2] < 0){
		// call to array is out of bounds
		API.ServerSco.lastError = "201";
		return "false";
	}
	else if(cmiArray[2] <= theCount){

		//create a new one or get existing object
		var existingObjectiveHandle = API.cmi.interactions.intArray(cmiArray[2]);
		if (existingObjectiveHandle == null){
			API.ServerSco.lastError = "101";
			return "false";
		}
		else{
			// we now have a reference to cmi.interactions.n
			// if theres 4 bits to the element path then try to see if object exists

			if (cmiArray.length == 4){
				strleaf = "existingObjectiveHandle." + cmiArray[3];
				var doesLeafExist = eval (strleaf);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "false";
				}
				else{

					// NEXT CHECK THAT THIS ELEMENT IS NOT READONLY
					strleafstatus = "doesLeafExist.cmireadStatus";
					var leafstatus = eval(strleafstatus);
					if (leafstatus == "readonly"){
						API.ServerSco.lastError = "403";
						return "false";
					}

                    // check the datatype and vocabulary...
                    var datatype = doesLeafExist.cmidatatype;
                    res = API.ServerSco.checkDataTypeAndVocab(element, value, datatype);
                    if (res == "true"){
                        // correct datatype...
  			            // WE CAN NOW TRY TO SET THE FULL OBJECT REFERENCE
					    var strleafval = "doesLeafExist.cmivalue =\"" + value + "\";";
					    var leafVal = eval(strleafval);
					    if (leafVal == null){
						    // IT FAILED AT THE FINAL HURDLE...
						    API.ServerSco.lastError = "201";
						    return "false";
					   }
					   else{
						    API.ServerSco.lastError = "0";
						    return "true";
					   }
                   }
                   else{
                       // incorrect data type...
			           API.ServerSco.lastError = "405";
                       return "false";
                   }
				}
			}
			if (cmiArray.length == 5){
				// check object exists
				strbranch = "existingObjectiveHandle."+ cmiArray[3] + ";";
				var doesLeafExist = eval (strbranch);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "false";
				}

				// check final object exists in the array list...
				nextstrbranch = "existingObjectiveHandle."+ cmiArray[3] + "." + cmiArray[4] + ";";
				var doesLeafExist = eval (nextstrbranch);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "false";
				}

				// check for write only
				strread = "existingObjectiveHandle."+ cmiArray[3] + "." + cmiArray[4] + ".cmireadStatus;";
				var isWriteOnly = eval (strread);
				if (isWriteOnly == "readonly"){
					API.ServerSco.lastError = "403";
					return "false";
				}

				// see if value exists
				strleaf = "existingObjectiveHandle."+ cmiArray[3] + "." + cmiArray[4] + ".cmivalue;";
				var doesLeafExist = eval (strleaf);
				if (doesLeafExist == null){
					API.ServerSco.lastError = "201";
					return "false";
				}
				else{
                    // check the datatype and vocabulary...
                    var datatype = doesLeafExist.cmidatatype;
                    res = API.ServerSco.checkDataTypeAndVocab(element, value, datatype);
                    if (res == "true"){
                        // correct datatype...
  			            // WE CAN NOW TRY TO SET THE FULL OBJECT REFERENCE
					    var strleafval = "doesLeafExist.cmivalue =\"" + value + "\";";
					    var leafVal = eval(strleafval);
					    if (leafVal == null){
						    // IT FAILED AT THE FINAL HURDLE...
						    API.ServerSco.lastError = "201";
						    return "false";
					    }
					    else{
						    API.ServerSco.lastError = "0";
						    return "true";
					    }
                    }
                    else{
                       // incorrect data type...
			           API.ServerSco.lastError = "405";
                       return "false";
                    }
				}
			}
			if (cmiArray.length == 6){
				// check object exists
				strbranch = "existingObjectiveHandle."+ cmiArray[3];
				var doesBranchExist = eval (strbranch);
				if (doesBranchExist == null){
					API.ServerSco.lastError = "201";
					return "false";
				}
				// The fifth argument should be an array reference, so do some checking...

				// IF 5TH ARG IS NOT A NUMBER THEN THROW ERROR
				// need to check cmiArray[4] to see if its a number
				if (isNaN(cmiArray[4])){
					API.ServerSco.lastError = "401";
					return "false";
				}

				// check to see if this element has a _count
				// If it hasn't we'll have to throw an error here
				// because we need the correct array index for array #2...
				var theCount = "existingObjectiveHandle." + cmiArray[3] + "._count.cmivalue;";
				var hasCount = eval(theCount);
				// CANT FIND _COUNT FOR THIS ELEMENT, SO THROW AN ERROR...
				if (hasCount == null){
					API.ServerSco.lastError = "201";
					return "false";
				}
				// next need to check to see if array ref is in array bounds
				if(cmiArray[4] > hasCount || cmiArray[4] < 0){
					// call to array is out of bounds
					API.ServerSco.lastError = "201";
					return "false";
				}

				// make sure that array index 4 is either 'objectives' or 'correct_responses'
				if (cmiArray[3] == "objectives"){
					// next check that there is an object here at this array index...
					var arrayIndex2Check = eval("existingObjectiveHandle." + cmiArray[3] + ".objectivesInteractionArray(" + cmiArray[4] + ")");
					// check for null
					if (arrayIndex2Check == null){
						API.ServerSco.lastError = "201";
						return "false";
					}
					else{
						// next check that the last element is valid...
						finalObjectCheck = eval ("arrayIndex2Check." + cmiArray[5]);
						if (finalObjectCheck == null){
							API.ServerSco.lastError = "201";
							return "false";
						}
						else{
							// call must be to a valid element in the model so...
							// check it for readonly...
							isWriteonly = eval ("finalObjectCheck.cmireadStatus");
							if (isWriteonly == "readonly"){
								API.ServerSco.lastError = "403";
								return "false";
							}
							else{

                                // check the datatype and vocabulary...
                                var datatype = finalObjectCheck.cmidatatype;
                                res = API.ServerSco.checkDataTypeAndVocab(element, value, datatype);
                                if (res == "true"){
                                    // correct datatype...
  			                        // WE CAN NOW TRY TO SET THE FULL OBJECT REFERENCE
                                    var strleafval = "finalObjectCheck.cmivalue =\"" + value + "\";";
					                var leafVal = eval(strleafval);
					                if (leafVal == null){
						                // IT FAILED AT THE FINAL HURDLE...
						                API.ServerSco.lastError = "201";
						                return "false";
                                    }
					                else{
						               API.ServerSco.lastError = "0";
						               return "true";
					                }
                               }
                               else{
                                   // incorrect data type...
			                       API.ServerSco.lastError = "405";
                                   return "false";
                               }
							}
						}
					}
				}else if (cmiArray[3] == "correct_responses"){
					// next check that there is an object here at this array index...
					var arrayIndex2Check = eval("existingObjectiveHandle." + cmiArray[3] + ".correctResponsesInteractionArray(" + cmiArray[4] + ")");
					// check for null
					if (arrayIndex2Check == null){
						API.ServerSco.lastError = "201";
						return "false";
					}else{
						// next check that the last element is valid...
						finalObjectCheck = eval ("arrayIndex2Check." + cmiArray[5]);
						if (finalObjectCheck == null){
							API.ServerSco.lastError = "201";
							return "false";
						}else{
							// call must be to a valid element in the model so...
							// check it for readonly...
							isWriteonly = eval ("finalObjectCheck.cmireadStatus");
							if (isWriteonly == "readonly"){
								API.ServerSco.lastError = "403";
								return "false";
							}else{
                                 // check the datatype and vocabulary...
                                var datatype = finalObjectCheck.cmidatatype;
                                res = API.ServerSco.checkDataTypeAndVocab(element, value, datatype);
                                if (res == "true"){
	                                // correct datatype...
	                  				// WE CAN NOW TRY TO SET THE FULL OBJECT REFERENCE
	                                var strleafval = "finalObjectCheck.cmivalue =\"" + value + "\";";
		                           	var leafVal = eval(strleafval);
		                           	if (leafVal == null){
				                       	// IT FAILED AT THE FINAL HURDLE...
				                       	API.ServerSco.lastError = "201";
				                       	return "false";
                                    }else{
			                       		API.ServerSco.lastError = "0";
                                        return "true";
		                           	}
                             	}else{
                                    // incorrect data type...
                                    API.ServerSco.lastError = "405";
                                    return "false";
                                }

							}
						}
					}
				}else {
					// throw an error because 4th arg was not either
					// objectives or correct_responses
					API.ServerSco.lastError = "201";
					return "false";
				}

			}

		}
	}

}

/*
* LMSGetValue.  Method to allow sco to read/access CMI datamodel elements
*/
function LMSGetValueMethod(element){
	if(this.ServerSco.isInitialized =="true")
	{
		if(cmiList ==0)  getAllCmi();
		var invalid = "false";
		var cannotHaveChildren = "false";
		var isNotAnArray = "false";
		// this checks to make sure there is at least one dot in the value
		if (element.indexOf(".")== -1){
			invalid = "true";
		}

		// dont bother doing this if we have already found an error...
		if (invalid != "true"){
			// we then loop around the children, making sure they exist one, by one...
			var cmiArray = element.split(".");
			var teststring = "this";
			for(i=0;i<cmiArray.length;i++){
				doesExist = eval(teststring + "." + cmiArray[i]+ ";");
				if(doesExist == null){
					invalid="true";
					// check for invalid _children call
					if (cmiArray[i]=="_children"){
						cannotHaveChildren = "true";
					}
					// check for invalid _count call
					if (cmiArray[i]=="_count"){
						isNotAnArray = "true";
					}
					break;
				}
				else{
					teststring = teststring + "." + cmiArray[i];
					// WE NEED TO TRAP THE OBJECTIVES...
					if (teststring=="this.cmi.objectives"){
//					alert( " get data " +dealWithGettingObjectives(element));
					
						return dealWithGettingObjectives(element);
					}
					// WE NEED TO TRAP THE INTERACTIONS...
					if (teststring=="this.cmi.interactions"){
						return dealWithGettingInteractions(element);
					}
				}
			}
        }

		// user tried to call _count on a non-array value
		if (isNotAnArray=="true"){
			this.ServerSco.lastError = "203";
			return "";
		}

		// user tried to call _children on an element that didnt support it
		if (cannotHaveChildren=="true"){
			this.ServerSco.lastError = "202";
			return "";
		}

		// if there was some kind of error found above, then...
		if (invalid == "true"){
			this.ServerSco.lastError = "401";
			return "";
		}
		else{
			// otherwise its a valid model reference...
			elementObj = eval ("this."+element);
		}

   		// next we will check to make sure this element is not writeonly..
		if (elementObj.cmireadStatus == "writeonly"){
			this.ServerSco.lastError = "404";
			return "";
		}
		else{
			// its okay and user can read it...
			this.ServerSco.lastError = "0";
			//alert("element elementObj.cmivalue => "+element+" "+elementObj.cmivalue);
			return elementObj.cmivalue;
		}
	}
	else{
		// not initialized...
		this.ServerSco.lastError = "301";
		return "";
	}
}

/*
* LMSSetValue.  Method to allow sco to write data to CMI datamodel
*/
function LMSSetValueMethod(element, value){
var CRETURN = '\r';
var LINEFEED = '\n';
	 value = unescape(value)  ;
     if (this.ServerSco.isInitialized == "true"){
		var invalid = "false";
		var cannotHaveChildren = "false";
		var isNotAnArray = "false";

                // check for sco trying to set _children & _count
                //element is a keyword, cannot set...
                if (element.indexOf("._children") != -1 || element.indexOf("._count") != -1){
                        this.ServerSco.lastError = "402";
                        return "false";
                }

		// this checks to make sure there is at least one dot in the value
                // if it doesnt, then it cant be a valid CMI model reference
		if (element.indexOf(".")== -1){
			invalid = "true";
		}

		// dont bother doing this if we have already found an error...
		if (invalid != "true"){
			// we then loop around the children, making sure they exist one, by one...
			var cmiArray = element.split(".");
			var teststring = "this";
			for(i=0;i<cmiArray.length;i++){
				doesExist = eval(teststring + "." + cmiArray[i]+ ";");
				if(doesExist == null){
					invalid="true";
					// check for invalid _children call
					if (cmiArray[i]=="_children"){
						cannotHaveChildren = "true";
					}
					// check for invalid _count call
					if (cmiArray[i]=="_count"){
						isNotAnArray = "true";
					}
					break;
				}
				else{
					teststring = teststring + "." + cmiArray[i];
					// WE NEED TO TRAP THE OBJECTIVES...
					if (teststring=="this.cmi.objectives"){
						return dealWithSettingObjectives(element, value);
					}
					// WE NEED TO TRAP THE INTERACTIONS...
					if (teststring=="this.cmi.interactions"){
						return dealWithSettingInteractions(element, value);
					}
				}
			}
		}

		// user tried to call _count on a non-array value
		if (isNotAnArray=="true"){
			this.ServerSco.lastError = "203";
			return "false";
		}

		// user tried to call _children on an element that didnt support it
		if (cannotHaveChildren=="true"){
			this.ServerSco.lastError = "202";
			return "false";
		}

		// if there was some kind of error found above, then...
		if (invalid=="true"){
			this.ServerSco.lastError = "401";
			return "false";
		}
		else{
			// otherwise its a valid model reference...
			elementObj = eval ("this."+element);
		}

		// check that its writeable...
		if (elementObj.cmireadStatus == "readonly"){
			this.ServerSco.lastError = "403";
			return "false";
		}
		else{
                        // check the datatype and vocabulary...
            var datatype = elementObj.cmidatatype;

            res = this.ServerSco.checkDataTypeAndVocab(element, value, datatype);
            //console.log("res = "+res);
            if (res == "true"){
                // correct datatype...
                // cmi.comments need to be appended...
                if (element == "cmi.comments"){
                    pre = this.LMSGetValue("cmi.comments");
                    setString = "this." + element + ".cmivalue =\"" + pre + value + "\";";
                }
                else{
            			setString = "this." + element + ".cmivalue =\"" + value + "\";";
                }
		    	if (setString.indexOf(CRETURN) > -1 || value.indexOf(LINEFEED) > -1)
		    	{
			  		setString=setString.replace(CRETURN,'\\\r');
		  	  		setString=setString.replace(LINEFEED,'\\n');  
		    	}
		        //alert("setString => "+setString);
		        var result = eval(setString);
	        	
		        cmiUpdate +=element+"="+value+"\n";
		        if(isAutoCommit =="true")     updateServer();
		        this.ServerSco.lastError = "0";
		        return "true";
            }else{
                // incorrect data type...
                this.ServerSco.lastError = "405";
                return "false";
           }
		}
	}
	else{
		// not initialized...
		this.ServerSco.lastError = "301";
		return "false";
	}
}

function LMSGetErrorStringMethod(errorCode){
	switch (errorCode)
 	{
 		case "0":   { return "No error"; break }
        case "101": { return "General exception"; break  }
        case "201": { return "Invalid argument error"; break }
        case "202": { return "Element cannot have children"; break  }
		case "203": { return "Element not an array - Cannot have count"; break  }
		case "301": { return "Not initialized"; break  }
		case "401": { return "Not implemented error"; break  }
		case "402": { return "Invalid set value, element is a keyword"; break  }
		case "403": { return "Element is read only"; break  }
		case "404": { return "Element is write only"; break  }
		case "405": { return "Incorrect Data Type"; break  }
		default:    { return ""; break }
	}
	// just to be safe...
	return;
}

function LMSGetLastErrorMethod(){
	return this.ServerSco.lastError;
}

function LMSGetDiagnosticMethod(errorCode){
	if (errorCode==""){
		errorCode=this.ServerSco.lastError;
	}
	switch (errorCode)
	{
		case "0":   { return "No error. No errors were encountered. Successful API call."; break }
        case "101": { return "General exception. An unexpected error was encountered."; break  }
		case "201": { return "Invalid argument error. A call was made to a DataModel element that does not exist."; break }
		case "202": { return "Element cannot have children. A call was made to an Element that does not support _children"; break  }
		case "203": { return "Element is not an array.  Cannot have count. A call was made to an Element that does not support _count."; break  }
		case "301": { return "Not initialized. The SCO has not yet been initialized.  It needs to call LMSInitialize() first."; break  }
		case "401": { return "Not implemented error.  A call was made to a DataModel element that is not supported."; break  }
		case "402": { return "Invalid set value, element is a keyword.  Keyword values cannot be changed"; break  }
		case "403": { return "Element is read only.  A call was made to set the value of a read-only element."; break  }
		case "404": { return "Element is write only.  A call was made to get the value of a write-only element."; break  }
		case "405": { return "Incorrect Data Type.  The syntax of a call to change an element was incorrect."; break  }
		default:    { return ""; break }
	}
}

/*
* --------------------------------------------------------------------------------------------------
*	Datatype and vocabulary checking
* --------------------------------------------------------------------------------------------------
*/

/*
* Method to check the datatype and vocabulary of an element
* returns true or false...
*/
function scoCheckDataTypeAndVocab (element, value, datatype){
    switch (datatype)
 	{
        case "CMIBlank":   { return checkCMIBlank(value); break }
        case "CMIBoolean": { return checkCMIBoolean(value); break  }
        case "CMIDecimal": { return checkCMIDecimal(value); break }
        case "CMIFeedback": { return  checkCMIFeedback(element, value); break  }
	    case "CMIIdentifier": { return  checkCMIIdentifier(value); break  }
	    case "CMIInteger": { return checkCMIInteger(value); break  }
	    case "CMISInteger": { return checkCMISInteger(element, value); break  }
	    case "CMIString255": { return checkCMIString255(value); break  }
	    case "CMIString4096": { return checkCMIString4096(value); break  }
	    case "CMITime": { return checkCMITime(value); break  }
	    case "CMITimespan": { return checkCMITimespan(value); break  }
	    case "CMIVocabularyCredit": { return checkCMIVocabularyCredit(value); break  }
	    case "CMIVocabularyStatus": { return checkCMIVocabularyStatus(element, value); break  }
	    case "CMIVocabularyEntry": { return checkCMIVocabularyEntry(value); break  }
	    case "CMIVocabularyMode": { return checkCMIVocabularyMode(value); break  }
	    case "CMIVocabularyExit": { return checkCMIVocabularyExit(value); break  }
	    case "CMIVocabularyTimeLimitAction": { return checkCMIVocabularyTimeLimitAction(value); break  }
	    case "CMIVocabularyInteraction": { return checkCMIVocabularyInteraction(value); break  }
	    case "CMIVocabularyResult": { return checkCMIVocabularyResult(value); break  }
        case "CMIDecimalOrCMIBlank": { return checkCMIDecimalOrCMIBlank(value); break  }
	    default:    { return "true"; break }
	}
}

function checkCMIDecimalOrCMIBlank(value){

    var isBlank = checkCMIBlank(value);
    var isCMIDecimal = checkCMIDecimal(value);
    if (isBlank == "true" || isCMIDecimal == "true"){
        if (value > 100 || value < 0){
            return "false";
        }
        else{
            return "true";
        }
    }else{
        return "false";
    }
}

function checkCMIVocabularyResult(value){
    var ans = checkCMIDecimal(value);
    if (ans == "true"){
        return "true";
    }
    if (value == "correct" || value == "wrong" ||
        value == "unanticipated" || value == "neutral"){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyInteraction(value){
    if (value == "true-false" || value == "choice" ||
        value == "fill-in" || value == "matching" ||
        value == "performance" || value == "likert" ||
        value == "sequencing" || value == "numeric"){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyTimeLimitAction(value){
    if (value == "exit,message" || value == "exit,no message" ||
        value == "continue,message" || value == "continue,no message"){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyExit(value){
    if (value == "time-out" || value == "suspend" ||
        value == "logout" || value == ""){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyMode(value){
    if (value == "normal" || value == "review" || value == "browse"){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyEntry(value){
    if (value == "ab-initio" || value == "resume" || value == ""){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyStatus(element, value){
    // sco cannot set lesson_status to not attempted
    if (element == "cmi.core.lesson_status" && value == "not attempted"){
        return false;
    }
    if (value == "passed" || value == "completed" ||
        value == "failed" || value == "incomplete" ||
        value == "browsed" || value == "not attempted"){
        return "true";
    }
    else{
        return "false";
    }
}

function checkCMIVocabularyCredit(value){
    if (value == "credit" || value == "no-credit"){
        return "true";
    }
    else{
        return "false";
    }
}


function checkCMITimespan(value){
   // must have some colons...
   if (value.indexOf(":") == -1){
       return "false";
   }
   // must contain at least 2 colons, giving 3 array elements...
   var cmiArray = value.split(":");
   if (cmiArray.length < 3){
      return "false";
   }
   // hours must be 4,3 or 2 digits...
   if (cmiArray[0].length < 2 || cmiArray[0].length > 4  ){
      return "false";
   }
   // minutes must be 2 digits...
   if (cmiArray[1].length != 2){
      return "false";
   }
   // must be numbers...
   if (isNaN(cmiArray[0]) || isNaN(cmiArray[1]) || isNaN(cmiArray[2])){
      return "false";
   }
   // 24hr clock for hours...
   if (parseInt(cmiArray[0]) < 0){
      return "false";
   }
   // parse minutes
   // NOTE: Seems illegal to have 99 minutes, but ADL 1.2
   // SCORM Conformance Test Suite does this? I'll do the same...
   // if (parseInt(cmiArray[1]) < 0 || parseInt(cmiArray[1]) > 59){
   if (parseInt(cmiArray[1]) < 0){
      return "false";
   }
   // check for decimal place...
   if (cmiArray[2].indexOf(".") != -1){
       var cmiDecArray = cmiArray[2].split(".");
       // can only be 2 values here...
       if (cmiDecArray.length != 2){
           return "false";
       }
       // again they must be numbers...
       if (isNaN(cmiDecArray[0]) || isNaN(cmiDecArray[1])){
           return "false";
       }
       // only two digits allowed for seconds...
       if (cmiDecArray[0].length != 2){
           return "false";
       }
       // make sure there is less than 60 seconds here...
       if (parseInt(cmiDecArray[0]) > 59 ){
          return "false";
       }
       // only one or two digits allowed for milliseconds...
       if (cmiDecArray[1].length > 2){
           return "false";
       }
   }
   else{
       // no dots, so must be no milliseconds...
       // make sure length is 2
       if (cmiArray[2].length != 2){
           return "false";
       }
       // make sure there is less than 60 seconds here...
       if (parseInt(cmiArray[2]) > 59 ){
          return "false";
       }
   }
   // got up to here, then value okay...
   return "true";
}

function checkCMITime(value){

   // must have some colons...
   if (value.indexOf(":") == -1){
       return "false";
   }
   // must contain at least 2 colons, giving 3 array elements...
   var cmiArray = value.split(":");
   if (cmiArray.length < 3){
      return "false";
   }
   // hours & minutes must be 2 digits...
   if (cmiArray[0].length != 2 || cmiArray[1].length != 2){
      return "false";
   }
   // must be numbers...
   if (isNaN(cmiArray[0]) || isNaN(cmiArray[1]) || isNaN(cmiArray[2])){
      return "false";
   }
   // 24hr clock for hours...
   if (parseInt(cmiArray[0]) < 0 || parseInt(cmiArray[0]) > 23){
      return "false";
   }
   // parse minutes
   if (parseInt(cmiArray[1]) < 0 || parseInt(cmiArray[1]) > 59){
      return "false";
   }
   // check for decimal place...
   if (cmiArray[2].indexOf(".") != -1){
       var cmiDecArray = cmiArray[2].split(".");
       // can only be 2 values here...
       if (cmiDecArray.length != 2){
           return "false";
       }
       // again they must be numbers...
       if (isNaN(cmiDecArray[0]) || isNaN(cmiDecArray[1])){
           return "false";
       }
       // only two digits allowed for seconds...
       if (cmiDecArray[0].length != 2){
           return "false";
       }
       // make sure there is less than 60 seconds here...
       if (parseInt(cmiDecArray[0]) > 59 ){
          return "false";
       }
       // only one or two digits allowed for milliseconds...
       if (cmiDecArray[1].length > 2){
           return "false";
       }
   }
   else{
       // no dots, so must be no milliseconds...
       // make sure length is 2
       if (cmiArray[2].length != 2){
           return "false";
       }
       // make sure there is less than 60 seconds here...
       if (parseInt(cmiArray[2]) > 59 ){
          return "false";
       }
   }
   // got up to here, then value okay...
   return "true";
}

function checkCMIString4096(value){
    if (value.length <= 4096){
       return "true";
    }
    else{
       return "false";
    }
}

function checkCMIString255(value){
    if (value.length <= 255){
       return "true";
    }
    else{
       return "false";
    }
}

function checkCMISInteger(element, value){
    if(isNaN(value)){
        return "false";
    }
    else{
        var num = parseInt(value);
        if (num >= -32768 && num <= 32768){
            if (element == "cmi.student_preference.audio"){
                if (num < -1 || num > 100){
                    return "false";
                }
                else{
                    return "true";
                }
            }
            else if (element == "cmi.student_preference.speed"){
                if (num < -100 || num > 100){
                    return "false";
                }
                else{
                    return "true";
                }
            }
            else if (element == "cmi.student_preference.text"){
                if (num < -1 || num > 1){
                    return "false";
                }
                else{
                    return "true";
                }
            }
            else{
                return "true";
            }
        }
        else{
            return "false";
        }
    }
}

function checkCMIInteger(value){
    if(isNaN(value)){
        return "false";
    }
    else{
        var num = parseInt(value);
        if (num >= 0 && num <= 65536){
            return "true";
        }
        else{
            return "false";
        }
    }
}

function checkCMIIdentifier(value){
    var SPACE = ' ';
    var TAB = '\t';
    var CRETURN = '\r';
    var LINEFEED = '\n';
    if (value.indexOf(SPACE) == -1 && value.indexOf(TAB) == -1
     && value.indexOf(CRETURN) == -1 && value.indexOf(LINEFEED) == -1){
        if (value.length > 0 && value.length < 256){
            return "true";
        }
        else{
            return "false";
        }
    }
    else{
        return "false";
    }
}

function checkCMIFeedback(element, value){
    // allow user to edit var at top of page to disable this checking...
    if (looseChecking == "false"){
        // need to find the type (if its set)
        var cmiArray = element.split(".");
	    // need to check cmiArray[2] to see if its a number
	    if (isNaN(cmiArray[2])){
            // this should be a number. However, Err on the side of caution...
            return "false";
	    }
        // make sure that this interaction already exists...
        var res = API.LMSGetValue("cmi.interactions._count");
        if (parseInt(cmiArray[2]) >= parseInt(res)){
            // then this interaction does not exist.. However, Err on the side of caution...
            return "false";
        }
        // Up to here? - then get the type
        var theType = "cmi.interactions.intArray("+cmiArray[2]+").type";
        elementObj = eval("API."+theType+";");
        if (elementObj == null){
            return "false";
        }
        datatype = elementObj.cmivalue;

        if (datatype == null){
            return "false";
        }
        // its not null, so it equals something, so...
        switch (datatype)
        {
            case "true-false":   { return checkTrueFalse(value); break }
            case "choice":   { return checkChoice(value); break }
            case "fill-in":   { return checkFillIn(value); break }
            case "numeric":   { return checkCMIDecimal(value); break }
            case "likert":   { return checkLikert(value); break }
            case "matching":   { return checkMatching(value); break }
            case "performance":   { return checkCMIString255(value); break }
            case "sequencing":   { return checkSequencing(value); break }
            // if its not been set then we should return false.  That would mean
            // that a cmi.interaction.n.type MUST have a value and cannot be empty
            default:   { return "false"; break }
        }
    }
    else{
        return "true";
    }

}

function checkMatching(value){
  // check for n.n
  var TEST_VAL = /^[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1}$/;
  // check for n.n,n.n,n.n etc
  var TEST_VAL2 = /^[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1})*[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1}$/;
  // check for {n.n,n.n,n.n etc }
  // Bugfix Mozilla firebird didnt like this line below
  // var TEST_VAL3 = /^{[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1})*[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1}}$/;
  var TEST_VAL3 = /^[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1},{1})*[a-z,A-Z,0-9]{1}.{1}[a-z,A-Z,0-9]{1}$/;
  if (TEST_VAL.test(value)) {
      return "true";
  }
  else if (TEST_VAL2.test(value)) {
      return "true";
  }
  else if (TEST_VAL3.test(value)) {
      return "true";
  }
  else{
      return "false";
  }
}

function checkSequencing(value){

  // test for single a-z 0-9
  var TEST_VAL = /^[a-z,A-Z,0-9]{1}$/;

  // test for format 1,2,3,a,b,c
  var TEST_VAL2 = /^[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9],)*[a-z,A-Z,0-9]{1}$/;

  if (TEST_VAL.test(value)) {
      return "true";
  }
  else if (TEST_VAL2.test(value)) {
      return "true";
  }
  else{
      return "false";
  }
}

function checkChoice(value){
  // test for single a-z 0-9
  var TEST_VAL = /^[a-z,A-Z,0-9]{1}$/;

  // test for format 1,2,3,a,b,c
  var TEST_VAL2 = /^[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9],)*[a-z,A-Z,0-9]{1}$/;

  // test for format {1,2,3,a,b,c}
  // Bugfix Mozilla firebird didnt like this line below
  //var TEST_VAL3 = /^{[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9],)*[a-z,A-Z,0-9]{1}}$/;
  var TEST_VAL3 = /^[a-z,A-Z,0-9]{1},{1}([a-z,A-Z,0-9],)*[a-z,A-Z,0-9]{1}$/;
  
  if (TEST_VAL.test(value)) {
      return "true";
  }else if (TEST_VAL2.test(value)) {
      return "true";
  }else if (TEST_VAL3.test(value)) {
      return "true";
  }else{
      return "false";
  }
}

function checkFillIn(value){
    return checkCMIString255(value);
}

function checkTrueFalse(value){
	value = value.toLowerCase();
    if (value == "0" || value == "1" || value == "t" || value == "f" || value == "T" || value == "F" || value == "False" || value == "false" || value == "True" || value == "true"){
        return "true";
    }else{
        return "false";
    }
}

function checkLikert(value){
  if (value.length == 0){
      return "true";
  }
  if (value.length > 1){
      return "false";
  }
  var TEST_VAL = /^[a-z,A-Z,0-9]{1}$/;
  if (TEST_VAL.test(value)) {
      return "true";
  }
  else{
      return "false";
  }
}

function checkCMIDecimal(value){
   if (isNaN(value)){
        return "false";
   }
   else{
        return "true";
   }
}

function checkCMIBoolean(value){
   if (value == "true" || value == "false"){
        return "true";
   }
   else{
        return "false";
   }
}

function checkCMIBlank(value){
   if (value != ""){
       return "false";
   }
   else{
       return "true";
   }
}

/*
* ----------------------------------------------------------------------------------------------------
*	The CMI Client side data models
* ----------------------------------------------------------------------------------------------------
*/

function CMIModel (){
	this._version = new CMIComponent("_version", "3.4", "readonly", "");
	this.core = new CMICoreModel;
	this.suspend_data = new CMIComponent("suspend_data", "", "both", "CMIString4096");
	this.launch_data = new CMIComponent("launch_data","","readonly", "CMIString4096");
	this.comments = new CMIComponent("comments","","both", "CMIString4096");
	this.comments_from_lms = new CMIComponent("comments_from_lms","","readonly", "CMIString4096");
	this.objectives = new ObjectivesModel;
	this.student_data = new StudentDataModel;
	this.student_preference = new StudentPreferenceModel;
	this.interactions = new InteractionsModel;
}

function CMICoreModel(){
	this._children = new CMIComponent("_children", "student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time", "readonly", "CMIString255");
	this.student_id = new CMIComponent("student_id", "", "readonly", "CMIIdentifier");
	this.student_name = new CMIComponent("student_name", "", "readonly", "CMIString255");
	this.lesson_location = new CMIComponent("lesson_location", "", "both", "CMIString255");
	this.credit = new CMIComponent("credit", "", "readonly", "CMIVocabularyCredit");
	this.lesson_status = new CMIComponent("lesson_status", "", "both", "CMIVocabularyStatus");
	this.entry = new CMIComponent("entry","","readonly", "CMIVocabularyEntry");
	this.score = new CMIScore;
	this.total_time = new CMIComponent("total_time", "", "readonly", "CMITimespan");
	this.lesson_mode = new CMIComponent("lesson_mode", "", "readonly", "CMIVocabularyMode");
	this.exit = new CMIComponent("exit", "", "writeonly", "CMIVocabularyExit");
	this.session_time = new CMIComponent("session_time", "", "writeonly", "CMITimespan");
}

function CMIScore(){
	this._children = new  CMIComponent("_children", "raw,min,max", "readonly", "CMIString255");
	this.raw = new CMIComponent("raw", "", "both", "CMIDecimalOrCMIBlank");
	this.max = new CMIComponent("max", "", "both", "CMIDecimalOrCMIBlank");
	this.min = new CMIComponent("min", "", "both", "CMIDecimalOrCMIBlank");
}

function StudentPreferenceModel(){
	this._children = new CMIComponent("_children", "audio,language,speed,text", "readonly", "CMIString255");
	this.audio = new CMIComponent("audio", "0", "both", "CMISInteger");
	this.language = new CMIComponent("language", "", "both", "CMIString255");
	this.speed = new CMIComponent("speed", "0", "both", "CMISInteger");
	this.text = new CMIComponent("text", "0", "both", "CMISInteger");
}

function StudentDataModel(){
	this._children = new CMIComponent("_count", "mastery_score,max_time_allowed,time_limit_action", "readonly", "CMIString255");
	this.mastery_score = new CMIComponent("mastery_score", "", "readonly", "CMIDecimal");
	this.max_time_allowed = new CMIComponent("max_time_allowed", "", "readonly", "CMITimespan");
	this.time_limit_action = new CMIComponent("time_limit_action", "", "readonly", "CMIVocabularyTimeLimitAction");
}

/*
*  The CMI objectives model
*/

function ObjectivesModel(){
	this._children = new CMIComponent("_children", "id,score,status", "readonly", "CMIString255");
	this._count = new CMIComponent("_count", 0, "readonly", "CMIInteger");
	this.objArray = ObjectiveArrayModel;
	this.objArr = new Array();
}

function ObjectiveArrayModel(index){
	if(index>this._count.cmivalue-1){
		if (index == this._count.cmivalue){
			// then create new one...
			this.objArr[index] = new singleObjectiveModel();
			this._count.cmivalue = this._count.cmivalue + 1;
			return this.objArr[index];
		}
		else{
			return "false";
		}
	}
	else{
		// we must be talking about this one so return object..
		return this.objArr[index];
	}
}


function singleObjectiveModel(){
	this.id = new CMIComponent("id", "", "both", "CMIIdentifier");
	this.score = new objectiveScoreModel;
	this.status = new CMIComponent("status", "", "both", "CMIVocabularyStatus");
}

function objectiveScoreModel(){
	this._children = new CMIComponent("_children", "raw,min,max", "readonly", "CMIString255");
	this.raw = new CMIComponent("raw", "", "both", "CMIDecimalOrCMIBlank");
	this.min = new CMIComponent("min", "", "both", "CMIDecimalOrCMIBlank");
	this.max = new CMIComponent("max", "", "both", "CMIDecimalOrCMIBlank");
}

/*
*  The CMI interactions model
*/

function InteractionsModel(){
	this._children = new CMIComponent("_children", "id,objectives,time,type,correct_responses,weighting,student_response,result,latency", "readonly", "CMIString255");
	this._count = new CMIComponent("_count", 0, "readonly", "CMIInteger");
	this.intArray = InteractionsArrayModel;
	this.intArr = new Array();
}

function InteractionsArrayModel(index){

	if(index>this._count.cmivalue-1){
		if (index == this._count.cmivalue){
			// then create new one...
			this.intArr[index] = new singleInteractionModel();
			this._count.cmivalue = this._count.cmivalue + 1;
			return this.intArr[index];
		}
		else{
			return "false";
		}
	}
	else{
		// we must be talking about this one so return object..
		return this.intArr[index];
	}
}

function singleInteractionModel(){
	this.id = new CMIComponent("id", "", "writeonly", "CMIIdentifier");
	this.objectives = new ObjectivesInteractionModel;
	this.time = new CMIComponent("time", "", "writeonly", "CMITime");
	this.type = new CMIComponent("type", "", "writeonly", "CMIVocabularyInteraction");
	this.correct_responses = new CorrectResponsesInteractionModel;
	this.weighting = new CMIComponent("weighting", "", "writeonly", "CMIDecimal");
	this.student_response = new CMIComponent("student_response", "", "writeonly", "CMIFeedback");
	this.result = new CMIComponent("result", "", "writeonly", "CMIVocabularyResult");
	this.latency = new CMIComponent("latency", "", "writeonly", "CMITimespan");
}

function ObjectivesInteractionModel(){
	this._count = new CMIComponent("_count", 0, "readonly", "CMIInteger");
	this.objectivesInteractionArray = SingleObjectivesInteractionModel;
	this.objectivesInteractionArr = new Array();
}

function SingleObjectivesInteractionModel(index){
	if(index>this._count.cmivalue-1){
		if (index == this._count.cmivalue){
			// then create new one...
			this.objectivesInteractionArr[index] = new SingleItemObjectivesInteractionModel();
			this._count.cmivalue = this._count.cmivalue + 1;
			return this.objectivesInteractionArr[index];
		}
		else{
			return "false";
		}
	}
	else{
		// we must be talking about this one so return object..
		return this.objectivesInteractionArr[index];
	}
}

function SingleItemObjectivesInteractionModel(){
	this.id = new CMIComponent("id", "", "writeonly", "CMIIdentifier");
}

function CorrectResponsesInteractionModel(){
	this._count = new CMIComponent("_count", 0, "readonly", "CMIInteger");
	this.correctResponsesInteractionArray = SingleCorrectResponsesInteractionModel;
	this.correctResponsesInteractionArr = new Array();
}

function SingleCorrectResponsesInteractionModel(index){
	if(index>this._count.cmivalue-1){
		if (index == this._count.cmivalue){
			// then create new one...
			this.correctResponsesInteractionArr[index] = new SingleItemCorrectResponsesInteractionModel();
			this._count.cmivalue = this._count.cmivalue + 1;
			return this.correctResponsesInteractionArr[index];
		}
		else{
			return "false";
		}
	}
	else{
		// we must be talking about this one so return object..
		return this.correctResponsesInteractionArr[index];
	}
}

function SingleItemCorrectResponsesInteractionModel(){
	this.pattern = new CMIComponent("pattern", "", "writeonly", "CMIFeedback");
}

/*
*
*
*/
function showCurrentModelState(infoOrForm){

	var divider = "";
	var titles = "";
	if (infoOrForm == "info"){
		divider = "\n";
        equals = "=";
		titles = "Current client CMI Datamodel\n\n";
	}
	else{
        equals = "~r@l@ad~";
		divider = "^r@l@ad^";
		titles = "";
	}

	a = "cmi.core.student_id" + equals + API.cmi.core.student_id.cmivalue + divider;
	b = "cmi.core.student_name" + equals + API.cmi.core.student_name.cmivalue + divider;
	c = "cmi.core.lesson_location" + equals + API.cmi.core.lesson_location.cmivalue + divider;
	d = "cmi.core.credit" + equals + API.cmi.core.credit.cmivalue + divider;
	e = "cmi.core.lesson_status" + equals + API.cmi.core.lesson_status.cmivalue + divider;
	f = "cmi.core.entry" + equals + API.cmi.core.entry.cmivalue + divider;
	g = "cmi.core.score.raw" + equals + API.cmi.core.score.raw.cmivalue + divider;
	h = "cmi.core.score.max" + equals + API.cmi.core.score.max.cmivalue + divider;
	i = "cmi.core.score.min" + equals + API.cmi.core.score.min.cmivalue + divider;
	j = "cmi.core.total_time" + equals + API.cmi.core.total_time.cmivalue + divider;
	k = "cmi.core.lesson_mode" + equals + API.cmi.core.lesson_mode.cmivalue + divider;
	l = "cmi.core.exit" + equals + API.cmi.core.exit.cmivalue + divider;
	m = "cmi.core.session_time" + equals + API.cmi.core.session_time.cmivalue + divider;
	n = "cmi.suspend_data" + equals + API.cmi.suspend_data.cmivalue + divider;
	o = "cmi.launch_data" + equals + API.cmi.launch_data.cmivalue + divider;
	p = "cmi.comments" + equals + API.cmi.comments.cmivalue + divider;
	q = "cmi.comments_from_lms" + equals + API.cmi.comments_from_lms.cmivalue + divider;
	r = "cmi.objectives._count" + equals + API.cmi.objectives._count.cmivalue + divider;

	var s = "";
	var objectivesCount = API.cmi.objectives._count.cmivalue;
	for (count=0; count < objectivesCount; count++){
		objHandle = API.cmi.objectives.objArray(count);
		idval = objHandle.id.cmivalue;
		scoreRaw = objHandle.score.raw.cmivalue;
		scoreMax = objHandle.score.max.cmivalue;
		scoreMin = objHandle.score.min.cmivalue;
                statval = objHandle.status.cmivalue;
		s = s + "cmi.objectives." + count + ".id" + equals + idval + divider;
		s = s + "cmi.objectives." + count + ".score.raw" + equals + scoreRaw + divider;
		s = s + "cmi.objectives." + count + ".score.max" + equals + scoreMax + divider;
		s = s + "cmi.objectives." + count + ".score.min" + equals + scoreMin + divider;
                s = s + "cmi.objectives." + count + ".status" + equals + statval + divider;
	}

    v = "cmi.student_data.mastery_score" + equals + API.cmi.student_data.mastery_score.cmivalue + divider;
    w = "cmi.student_data.max_time_allowed" + equals + API.cmi.student_data.max_time_allowed.cmivalue + divider;
    x = "cmi.student_data.time_limit_action" + equals + API.cmi.student_data.time_limit_action.cmivalue + divider;

    y = "cmi.student_preference.audio" + equals + API.cmi.student_preference.audio.cmivalue + divider;
    z = "cmi.student_preference.language" + equals + API.cmi.student_preference.language.cmivalue + divider;
    zz = "cmi.student_preference.speed" + equals + API.cmi.student_preference.speed.cmivalue + divider;
    zzz = "cmi.student_preference.text" + equals + API.cmi.student_preference.text.cmivalue + divider;

	t = "cmi.interactions._count" + equals + API.cmi.interactions._count.cmivalue + divider;

	var u = "";
	var interactionsCount = API.cmi.interactions._count.cmivalue
	for (intcount=0; intcount < interactionsCount; intcount++){
		intHandle = API.cmi.interactions.intArray(intcount);

		idval = intHandle.id.cmivalue;
		u = u + "cmi.interactions." + intcount + ".id" + equals + idval + divider;

		interObjCount = intHandle.objectives._count.cmivalue;
		u = u + "cmi.interactions." + intcount + ".objectives._count" + equals + interObjCount + divider;

		for (objcount=0; objcount < interObjCount; objcount++){
			 interactionObjectiveHandle = intHandle.objectives.objectivesInteractionArray(objcount);
			 objid = interactionObjectiveHandle.id.cmivalue;
			 u = u + "cmi.interactions." + intcount + ".objectives." + objcount + ".id" + equals + objid + divider;
		}

		srCount = intHandle.correct_responses._count.cmivalue;
		u = u + "cmi.interactions." + intcount + ".correct_responses._count" + equals + srCount + divider;

		for (objcount=0; objcount < srCount; objcount++){
			 interactionSRHandle = intHandle.correct_responses.correctResponsesInteractionArray(objcount);
			 patternid = interactionSRHandle.pattern.cmivalue;
			 u = u + "cmi.interactions." + intcount + ".correct_responses." + objcount + ".pattern" + equals + patternid + divider;
		}


		timeval = intHandle.time.cmivalue;
		u = u + "cmi.interactions." + intcount + ".time" + equals + timeval + divider;

		typeval = intHandle.type.cmivalue;
		u = u + "cmi.interactions." + intcount + ".type" + equals + typeval + divider;

		weightingval = intHandle.weighting.cmivalue;
		u = u + "cmi.interactions." + intcount + ".weighting" + equals + weightingval + divider;

		student_responseval = intHandle.student_response.cmivalue;
		u = u + "cmi.interactions." + intcount + ".student_response" + equals + student_responseval + divider;

		resultval = intHandle.result.cmivalue;
		u = u + "cmi.interactions." + intcount + ".result" + equals + resultval + divider;

		latencyval = intHandle.latency.cmivalue;
		u = u + "cmi.interactions." + intcount + ".latency" + equals + latencyval + divider;
	}

	var alertString = titles+a+b+c+d+e+f+g+h+i+j+k+l+m+n+o+p+q+r+s+v+w+x+y+z+zz+zzz+t+u;
	return alertString;

}

function abnormalExit(){
      top.window.frames.text.location.href="pleasewait.htm";
}

// a next/prev was clicked in this frame, so update the model before unloading
//
function changeItem(scoID, anEvent){
	jEventHandler = anEvent;
    // no need to wait if already finished..
    if (API.ServerSco.isInitialized == "true"){
       top.window.frames.text.location.href="pleasewait.htm";
      // setTimeout("top.window.frames.LMSFrame.location.href=\"LMSFrame.jsp?scoID="+scoID+"\"", 1000);
      nextSco = scoID;
    }
    else{
       top.window.frames.LMSFrame.location.href="LMSFrame.jsp?scoID="+scoID;
    }
}

function loadNewSco(){
	if (jEventHandler == "quit"){
		jEventHandler = null;
		isNavVisisble == "false";
		showHideNav();
		disableBothButtons();
		CPAPI.isCourseCompleted = true;
		removeTreeToggle();
		top.window.text.location.href="suspended.htm";
	}
	else if (jEventHandler == "nav"){
		jEventHandler = null;
		top.window.frames.LMSFrame.location.href="LMSFrame.jsp?scoID="+ nextSco;
	}
	else if (jEventHandler == "tree"){
		jEventHandler = null;
		top.window.frames.LMSFrame.location.href="LMSFrame.jsp?scoID="+ nextSco;
	}
	else{
		if (autoProgress == "true"){
			jEventHandler = null;
			if(nextSco == "null"){
				top.window.frames.text.location.href="course_completed.jsp";
			}
			else{
				top.window.frames.LMSFrame.location.href="LMSFrame.jsp?scoID="+ nextSco;
			}
		}
	}
}

/*
* a function used in debug mode to see the current cmi model
*/
function viewModel(){
	return showCurrentModelState("info");
}

function isInitialised(param){
	return API.ServerSco.isInitialized;
}

function showCurrentErrorCodes(){
	alert(API.LMSGetLastError());
}

/*
* function which actually loads in the sco into the content "text" frame
*/
function loadScoContent(page){
    top.window.frames.text.location.href=page;
}

function gotoErrorPage(){
   top.window.location.href = "scope_error.htm";
}

function quitPlayer(){
  quitLMS = "true";
  jEventHandler = "quit";
  if (API.ServerSco.isInitialized == "true"){
    // Can't do this as its readonly  - API.LMSSetValue("cmi.core.entry", "resume");
    // so overide this by directly accessing object...
    //var setString = "API.cmi.core.entry.cmivalue =\"resume\";";
    //var result = eval(setString);
    //
    // exit is writeable, so do it the normal way
    API.LMSSetValue("cmi.core.exit", "suspend");
    // unload this page
    loadNewSco();
  }
  else{
	  loadNewSco();
  }
}

function runTest(params){
  if (params !="dummy"){
    var param = params.split("@");
    // call with empty string
    if (param[1]==0){ 
        parameter = "";
        answer = eval(param[0] + "(\"" + parameter +"\")");
        if(answer!=null){
            alert(param[0] + "(\"" + parameter +"\") returned:\n"  +answer+ "\n" + API.LMSGetDiagnostic(API.LMSGetLastError()));
        }   
    }
    else if(param[1]==1){    
	    parameter=prompt("Enter Value for " + param[0],""); 
	    if(parameter!=null){
	        answer = eval(param[0] + "(\"" + parameter +"\")");
	        if(answer!=null){
	            alert(param[0] + "(\"" + parameter +"\") returned:\n"  +answer+ "\n" + API.LMSGetDiagnostic(API.LMSGetLastError()));
	        }
	    }
    }
    else if(param[1]==2){
        parameter=prompt("Enter Values for " + param[0] +"\n SPLIT the two values with a pipe - \"|\"",""); 
        if(parameter!=null){
            var theTwo = parameter.split("|");
            answer = eval(param[0] + "(\"" + theTwo[0] + "\",\"" + theTwo[1]+ "\")");
            if(answer!=null){
                alert(param[0] + "(\"" + parameter +"\") returned:\n"  + answer + "\n" + API.LMSGetDiagnostic(API.LMSGetLastError()));
            }
        }            
    }
    else {
        alert("can only specifiy 2 parameters");
    }
  }
}

function LMSSetAutoCommit()
{}


var XMLHttpReq; 
var url ="/ilearn/en/learner/jsp/lms.jsp";
var rstring ="";
function createXMLHttpRequest() { 
	if(window.XMLHttpRequest) 
	{
	XMLHttpReq = new XMLHttpRequest(); 
	} 
	else if (window.ActiveXObject) 
	{
		try { 
		XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP"); 
		} catch (e) {}
		try { 
		XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP"); 
		} catch (e) {}
	} 
} 

function setUrl(turl) 
{
	this.url=turl; 
}


function processResponse()
{ 
rstring="";
	if (XMLHttpReq.readyState == 4) 
	{
		if (XMLHttpReq.status == 200) 
		{
		rstring = XMLHttpReq.responseText;
//		alert("  get XMLHttpReq "+rstring);
		} 
		else
		{
		alert("Error To Get Data! Try Later!"); 
		return null;
		}
	} 
}



function sendRequest(taction) { 
	createXMLHttpRequest(); 
	XMLHttpReq.open("GET", url, false); 
	XMLHttpReq.onreadystatechange = processResponse;	
	XMLHttpReq.send("action="+taction);	
}




/*
* -----------------------------------------------------------------------------------------------
* END OF CLIENT IMPLEMENTATION
* -----------------------------------------------------------------------------------------------
*/
