/**
 * Formalize the definition of a transition object.
 * A Transition Object is a record that pairs a transition token with a session token
 * and also that provides basic information about server side and client side operations
 * necessary to coordinate a transition of state between the two.
 */
class TransitionObject {
    token;
    session_token;
    secondary_action;
    type;
    elements;
    amelioritive_action;
    extras;
    constructor(type) {
        //
        this.token = "nothing";
        this.session_token = undefined;
        this.secondary_action = false;
        this.type = type;
        //
        this.elements = {};
        this.amelioritive_action = false;
        this.extras = false;
    }
    /**
     * Returns an object without class information containing a minimal set of top level fields refering to current values.
     * If the *preserve_fields* parameter is supplied, this method assumes that it is an array of field names.
     * The extra field will be added to the object produced by this method.
     * @param {string[]} [preserve_fields]
     *
     * @returns {object}
     */
    to_object(preserve_fields) {
        let self = this;
        let obj = {};
        //
        let keep_fields = [ "token", "secondary_action", "session_token", "type", "elements", "amelioritive_action" ]
        if ( preserve_fields ) {
            if ( Array.isArray(preserve_fields) ) {
                keep_fields = keep_fields.concat(preserve_fields)
            } else if ( typeof preserve_fields === "string" ) {
                keep_fields.push(preserve_fields)
            }    
        }
        //
        for ( let fld of keep_fields ) {
            obj[fld] = self[fld];
        }
        if (this.extras && Array.isArray(this.extras)) {
            for (let fld of this.extras) {
                obj[fld] = self[fld];
            }
        }
        return obj
    }
    /**
     * Fix the token of this object.
     * @param {string} token
     */
    set_token(token) {
        this.token = token;
    }
    /**
     * Set the session id with the expectation that this assertion declares that the token belong to a session.
     * @param {string} sess_id
     */
    set_session(sess_id) {
        this.session_token = sess_id;
    }
    /**
     * If this token has been assigned to a session, then erase the session identifier and replace it with
     * a message of abandonment, 'sess+gone'.
     */
    clear_session() {
        this.session_token = 'sess+gone';
    }
    /**
     * Extend the elements object with more fields and info. These may overwrite existing fields.
     * @param {object} obj
     */
    add_to_elements(obj) {
        this.elements = Object.assign(this.elements, obj);
    }
    /**
     * The fields returned from `to_object`  are by default just a few provided by the base classs.
     * For **TransitionObject** these are just the following: "token", "secondary_action", "session_token", "type"
     * Use this method to add more field to be included in the `to_object` report.
     * @param {string} fld
     */
    add_extra_field(fld) {
        if (!this.extras)
            this.extras = [];
        if (Array.isArray(this.extras)) {
            if (this.extras.indexOf(fld) < 0) {
                this.extras.push(fld);
            }
        }
    }
    /**
     * Call `add_extra_field` for each member of the `fld_list` parameter.
     * @param {string[]} fld_list
     */
    add_extra_fields(fld_list) {
        if (Array.isArray(fld_list)) {
            for (let fld of fld_list) {
                this.add_extra_field(fld);
            }
        }
    }
}
/**
 * Add fields for login transtion objects
 *
 * Adds these fields: `_t_u_key`,`user_key`, `strategy'
 *
 * The strategy defaults to `ucwid` and distributed ID *ucwid* is a kind of [cwid](https://www.npmjs.com/package/cwid).
 * This indicates to some login processor that the particular kind of ID will be used to identify a user.
 * Applications may use other strategies or several. This type merely provides the placeholder.
 *
 * In [copious-transition-applications](), the field `_t_u_key` is used to identify which JSON field of some object,
 * such as a web app POST parameters will be contain the information to be stored in the `user_key`, which itself may eventually
 * be a key into some DB.  The key, `_db_session_key` provides a similar function and is often the same as `_t_u_key`.
 *
 * @extends TransitionObject
 *
 */
class LoginTransitionObject extends TransitionObject {
    _t_u_key;
    _db_session_key;
    user_key;
    strategy;
    constructor(type) {
        super(type);
        this.extras = ['_t_u_key', 'user_key', 'strategy'];
        this._t_u_key = false;
        this.user_key = false;
        this.strategy = 'ucwid';
        this._db_session_key = false;
    }
    set user(uk) {
        if (typeof uk === 'boolean') {
            this.user_key = false;
        }
        else
            this.user_key = uk;
    }
    get user() {
        if (this.user_key !== false)
            return this.user_key;
        return "";
    }
}
/**
 * Add fields for logout transtion objects
 *
 * @extends TransitionObject
 */
class LogoutTransitionObject extends TransitionObject {
    constructor(type) {
        super(type);
        this.extras = [];
    }
}
/**
 * Add fields for registration transtion objects
 *
 * @extends TransitionObject
 */
class RegistrationTransitionObject extends TransitionObject {
    constructor(type) {
        super(type);
        this.extras = [];
    }
}
/**
 * Add fields for process transtion objects - the true transitions
 *
 * The **ProcessTransitionObject** defaults to `secondary_action` set to true.
 * A field `asset_key` extend the base object and will be named by the transition parameter.
 * The type of the transition object is `transition`.
 *
 * @extends TransitionObject
 */
class ProcessTransitionObject extends TransitionObject {
    asset_key;
    constructor(transition) {
        super('transition');
        this.secondary_action = true;
        this.asset_key = transition;
        this.extras = ['asset_key'];
    }
}



module.exports = {
    TransitionObject,
    LoginTransitionObject,
    LogoutTransitionObject,
    RegistrationTransitionObject,
    ProcessTransitionObject
}