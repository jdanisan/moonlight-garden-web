import { useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../services/firebase";
import { Button } from "../atoms/Button";
import { sendPasswordResetEmail } from "firebase/auth";

export function UserAuthModal({ variant = "form-user", onClose, onSwitch }) {
    const isRegister = variant === "new-user";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // fuerza contraseña
    const getPasswordStrength = () => {
        if (password.length < 6) return 1;
        if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return 3;
        return 2;
    };

    //REset contraseña
    const handleResetPassword = async () => {
        setEmailError("");

        if (!email) {
            setEmailError("Introduce tu email primero");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setEmailError("Te hemos enviado un correo para recuperar tu contraseña");
        } catch (err) {
            switch (err.code) {
                case "auth/user-not-found":
                    setEmailError("No existe una cuenta con este email");
                    break;
                case "auth/invalid-email":
                    setEmailError("Email inválido");
                    break;
                default:
                    setEmailError("Error al enviar el email");
            }
        }
    };

    const strength = getPasswordStrength();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        try {
            if (isRegister) {
                const userCred = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                await set(ref(db, `users/${userCred.user.uid}`), {
                    email,
                    role: "user",
                    createdAt: Date.now(),
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                console.log(email, password);
            }

            onClose();
        } catch (err) {
            //manejo fino de errores
            switch (err.code) {
                case "auth/email-already-in-use":
                    setEmailError("Este email ya está en uso");
                    break;
                case "auth/invalid-email":
                    setEmailError("Email inválido");
                    break;
                case "auth/user-not-found":
                    setEmailError("Usuario no encontrado");
                    break;
                case "auth/wrong-password":
                    setPasswordError("Contraseña incorrecta");
                    break;
                case "auth/weak-password":
                    setPasswordError("Contraseña demasiado débil");
                    break;
                default:
                    setEmailError("Error de credenciales");
            }
        }
    };

    return (
        <div className="w-[320px]">
            <h2 className="text-xl font-bold mb-4">
                {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* EMAIL */}
                <div>
                    <input
                        className={`border p-2 rounded w-full ${emailError ? "border-red-500" : ""
                            }`}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                </div>

                {/* PASSWORD */}
                <div>
                    <input
                        className={`border p-2 rounded w-full ${passwordError ? "border-red-500" : ""
                            }`}
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isRegister && (
                        <p
                            className="text-sm text-right mt-1 cursor-pointer text-blue-500"
                            onClick={handleResetPassword}
                        >
                            ¿Has olvidado la contraseña?
                        </p>
                    )}

                    {/* barra de fuerza SOLO en registro */}
                    {isRegister && (
                        <div className="h-2 mt-2 bg-gray-200 rounded">
                            <div
                                className={`h-2 rounded transition-all ${strength === 1
                                    ? "w-1/3 bg-red-500"
                                    : strength === 2
                                        ? "w-2/3 bg-yellow-500"
                                        : "w-full bg-green-500"
                                    }`}
                            />
                        </div>
                    )}

                    {passwordError && (
                        <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    label={isRegister ? "Registrarse" : "Entrar"}
                    variant="goBuy" // o crea uno nuevo tipo "authPrimary"
                    className="w-full"
                />
            </form>

            {/* 🔁 SWITCH LOGIN / REGISTER */}
            <p className="text-sm mt-4 text-center">
                {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
                <Button
                    label={isRegister ? "Inicia sesión" : "Regístrate"}
                    variant="authLink"
                    onClick={onSwitch}
                />
            </p>
        </div>
    );
}
