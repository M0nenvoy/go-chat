document.addEventListener("DOMContentLoaded", (_) => {
    let input: HTMLTextAreaElement = document.getElementById('login-input') as HTMLTextAreaElement
    input.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key == "Enter") {
            let username = input.value
            e.preventDefault()
            input.value = ""
            document.cookie = `username=${username};`

            // Redirect to the chat
            window.location.replace(`/`)
        }
    })

})
