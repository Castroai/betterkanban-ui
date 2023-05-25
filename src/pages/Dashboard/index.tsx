export const Dashboard = () => {
  const getTimeOfDay = (): "morning" | "afternoon" | "evening" => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  };
  const timeOfDay = getTimeOfDay();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Hello good {timeOfDay}!</h1>
    </div>
  );
};
