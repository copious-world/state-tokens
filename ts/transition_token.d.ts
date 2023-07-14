declare type FieldName = string;
/**
 * Formalize the definition of a transition object.
 * A Transition Object is a record that pairs a transition token with a session token
 * and also that provides basic information about server side and client side operations
 * necessary to coordinate a transition of state between the two.
 */
export declare class TransitionObject {
    token: string;
    session_token: string | undefined;
    secondary_action: boolean;
    type: string;
    elements: object;
    amelioritive_action: boolean;
    extras: boolean | string[];
    constructor(type: string);
    /**
     * Returns an object without class information containing a minimal set of top level fields refering to current values.
     * If the *extras* parameter is supplied, this method assumes that it is an array of field names.
     * The extra field will be added to the object produced by this method.
     * @param {string[]} [extras]
     *
     * @returns {object}
     */
    to_object(): void;
    /**
     * Fix the token of this object.
     * @param {string} token
     */
    set_token(token: string): void;
    /**
     * Set the session id with the expectation that this assertion declares that the token belong to a session.
     * @param {string} sess_id
     */
    set_session(sess_id: string): void;
    /**
     * If this token has been assigned to a session, then erase the session identifier and replace it with
     * a message of abandonment, 'sess+gone'.
     */
    clear_session(): void;
    /**
     * Extend the elements object with more fields and info. These may overwrite existing fields.
     * @param {object} obj
     */
    add_to_elements(obj: object): void;
    /**
     * The fields returned from `to_object`  are by default just a few provided by the base classs.
     * For **TransitionObject** these are just the following: "token", "secondary_action", "session_token", "type"
     * Use this method to add more field to be included in the `to_object` report.
     * @param {string} fld
     */
    add_extra_field(fld: any): void;
    /**
     * Call `add_extra_field` for each member of the `fld_list` parameter.
     * @param {string[]} fld_list
     */
    add_extra_fields(fld_list: string[]): void;
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
export declare class LoginTransitionObject extends TransitionObject {
    _t_u_key: FieldName | boolean;
    _db_session_key: FieldName | boolean;
    user_key: string | boolean;
    strategy: string | boolean;
    constructor(type: string);
    set user(uk: string | boolean);
    get user(): string;
}
/**
 * Add fields for logout transtion objects
 *
 * @extends TransitionObject
 */
export declare class LogoutTransitionObject extends TransitionObject {
    constructor(type: string);
}
/**
 * Add fields for registration transtion objects
 *
 * @extends TransitionObject
 */
export declare class RegistrationTransitionObject extends TransitionObject {
    constructor(type: string);
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
export declare class ProcessTransitionObject extends TransitionObject {
    asset_key: string;
    constructor(transition: string);
}
export {};
