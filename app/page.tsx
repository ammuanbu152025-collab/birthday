import BirthdayApp from "@/components/BirthdayApp";

export default function Home() {
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  return <BirthdayApp onLogout={handleLogout} />;
}