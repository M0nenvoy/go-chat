export namespace cookie {
    // Get the username of the user. Or empty string if he's not
    // logged in.
    export function username() : string {
        return get('username')
    }

    // Get cookie by name
    export function get(name: string) : string {
        let cookie: any = {}

        // Take notice that we won't have any `;` if there's only one cookie
        let tokens = document.cookie.split(';')

        for (const tk in tokens) {
            let token = tokens[tk]
            let [k, v] = token.split('=')
            cookie[k.trim()] = v
        }

        // Return cookie if found
        if (cookie[name] != undefined)
            return cookie[name]
        return ""
    }
}
