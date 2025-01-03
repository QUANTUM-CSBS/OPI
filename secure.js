        document.addEventListener("contextmenu", function(event){
            alert("Inspect Elements Not Allowed");
            event.preventDefault();
        });

        function validateAndOpenPage() {
            var username = document.getElementById('usernameInput').value;
            var password = document.getElementById('passwordInput').value;

            if (username.trim() === "" || password.trim() === "") {
                alert("Please enter both username and password.");
                return;
            }

            let predefinedPassword = "LA";

            
            if (password !== predefinedPassword) {
                alert("Incorrect password. Please try again.");
                return;
            }

         
            var url = 'Route.html?username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);

            
            window.open(url, '_blank');
        }

        function openForgotPasswordPage() {
            window.open('forgot.html', '_blank');
        }

        function SignInPage() {
            window.open('switch.html', '_blank');
        }

        function togglePasswordVisibility() {
            var passwordField = document.getElementById('passwordInput');
            var toggleIcon = document.getElementById('togglePassword');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleIcon.src = 'open-eye.svg'; 
            } else {
                passwordField.type = 'password';
                toggleIcon.src = 'close-eye.svg'; 
            }
        }
    