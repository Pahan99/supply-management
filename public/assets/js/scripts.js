// login validation
const handleLogin = async () => {

    const usernameInput = document.querySelector('.form-control.username');
    const passwordInput = document.querySelector('.form-control.password');
    const formFloating  = document.querySelector('.form-floating');

    let valid = true;

    if (usernameInput.value === ""){
        setError(usernameInput, formFloating);
        valid = false;
    }
    else{
        setSuccess(usernameInput, formFloating);
    }

    if (passwordInput.value === ""){
        setError(passwordInput, formFloating);
        valid = false;
    }
    else{
        setSuccess(passwordInput, formFloating);
    }

    if (valid){
        const payload = { username: usernameInput.value, password: passwordInput.value }
        const result = await fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const response = await result.json();
        if (! response.valid){
            setError(usernameInput, formFloating);
            setError(passwordInput, formFloating);
        }
        else{
            setSuccess(usernameInput, formFloating);
            setSuccess(passwordInput, formFloating);
            document.location = "/dashboard";
        }
    }else{
        console.log("Input fields cannot be empty");
    }
}

const setError = (input, formElement) => {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    formElement.classList.add("is-invalid");
}

const setSuccess = (input, formElement) => {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    formElement.classList.remove("is-invalid");
}


