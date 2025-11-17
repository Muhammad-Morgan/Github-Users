import StatsCard from "./StatsCard";
type StatsContainerProps = {
  totalRepos: number;
  followers: number;
  following: number;
  gists: number;
};
const StatsContainer = ({ totalRepos, followers, following, gists }: StatsContainerProps) => {
  return (
    <div className="mb-8 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard title="Total Repositories" count={totalRepos} />
      <StatsCard title="Followers" count={followers} />
      <StatsCard title="Following" count={following} />
      <StatsCard title="Total Gists" count={gists} />
    </div>
  );
};

export default StatsContainer;
