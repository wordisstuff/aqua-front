import { useId } from 'react';

export const ResetPageForm = () => {
    const emailId = useId();

    return (
        <div>
            <form>
                <h1>Send your account email</h1>
                <div>
                    <label htmlFor={emailId}>Email</label>
                    <input type="email" name="email" />
                </div>
                <button type="submit" disabled={!isValid}>
                    Send
                </button>
            </form>

            <div>
                <p>Remember your password?</p>
                <NavLink to="/signin">Sign in</NavLink>
            </div>

            <nav>
                <NavLink>Sign up</NavLink>
                <NavLink>Sign in</NavLink>
            </nav>
        </div>
    );
};
