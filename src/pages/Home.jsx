import LoginForm from "@/components/ui/LoginForm";
export default function Home({ loggedIn, onLogin }) {
    console.log("login state in home:", loggedIn)
    return (
        <div>
            <h1>This is Home</h1>
            {!loggedIn && <LoginForm onLogin={onLogin} loggedIn={loggedIn} />}
        </div>
    );
}
