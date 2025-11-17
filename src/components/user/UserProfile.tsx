// useQuery to make the request, GET_USER query, and UserData
import { useQuery } from "@apollo/client/react";
import { GET_USER } from "@/queries";
import type { UserData } from "@/types";
import UserCard from "./UserCard";
import StatsContainer from "./StatsContainer";
import ForkedRepos from "../charts/ForkedRepos";
import PopularRepos from "../charts/PopularRepos";
import UsedLanguages from "../charts/UsedLanguages";
import Loading from "./Loading";

type UserProfileProps = {
  userName: string;
};
const UserProfile = ({ userName }: UserProfileProps) => {
  // Setting the generice useQuery paramter type into a UserData, and passing the query itslef, and as second argument is the login variable to be userName coming from the searchForm. Then destructing back from the hook the response data + loading state (i guess) + error if exisits

  const { data, loading, error } = useQuery<UserData>(GET_USER, {
    variables: { login: userName },
  });

  if (loading) return <Loading />;
  if (error) return <h2 className="text-xl">{error.message}</h2>;
  if (!data) return <h2 className="text-xl">User Not Found.</h2>;
  const { url, avatarUrl, name, bio, repositories, followers, following, gists } = data.user;
  return (
    <div>
      <UserCard url={url} avatarUrl={avatarUrl} name={name} bio={bio} />
      <StatsContainer
        totalRepos={repositories.totalCount}
        followers={followers.totalCount}
        following={following.totalCount}
        gists={gists.totalCount}
      />
      {repositories.nodes.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <UsedLanguages repositories={repositories.nodes} />
          <PopularRepos repositories={repositories.nodes} />
          <ForkedRepos repositories={repositories.nodes} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
