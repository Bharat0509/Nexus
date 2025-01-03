import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import SortableTable from "./SortedTable";
import SearchBar from "./SearchBar";
import CustomBarChart from "./BarChart";
import { BatchCard } from "./BatchCard";
import Loader from "../Loader/Loader"; // Assuming you have a Loader component
import UpcomingContests from "./UpcomingContests"; // Import the new component
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cp = () => {
  const [userData, setUserData] = useState([]);
  const [batchData, setBatchData] = useState({});
  const [codeforcesLeaderboard, setCodeforcesLeaderboard] = useState([]);
  const [leetcodeLeaderboard, setLeetcodeLeaderboard] = useState([]);
  const [codechefLeaderboard, setCodechefLeaderboard] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/get/`,
        );
        const data = await response.json();
        const batchWiseData = {};
        const cfLeaderboard = [];
        const lcLeaderboard = [];
        const ccLeaderboard = [];

        const localData = JSON.parse(localStorage.getItem('coding-profile-data'));
        if(localData && Date.now() - localData.lastUpdate < 1000 * 60 * 60 * 24){
          setUserData(localData['users']);
          setBatchData(localData['batchData']);
          setCodeforcesLeaderboard(localData['codeforcesLeaderboard']);
          setLeetcodeLeaderboard(localData['leetcodeLeaderboard']);
          setCodechefLeaderboard(localData['codechefLeaderboard']);
          setLoading(false);
          return;
        }

        await Promise.all(
          data.users.map(async (user) => {
            const batch = user.admissionNumber.slice(1, 3);

            if (!batchWiseData[batch]) {
              batchWiseData[batch] = {
                Codeforces: { totalRating: 0, userCount: 0 },
                LeetCode: { totalRating: 0, totalSolved: 0, userCount: 0 },
                CodeChef: { totalRating: 0, userCount: 0 },
              };
            }

            const leetcodeUsername = user.leetcodeProfile
              ? user.leetcodeProfile
              : null;
            const codeforcesUsername = user.codeforcesProfile
              ? user.codeforcesProfile
              : null;
            const codechefUsername = user.codechefProfile
              ? user.codechefProfile
              : null;

            // Fetch Codeforces data
            if (codeforcesUsername) {
              const cfResponse = await fetch(
                `${process.env.REACT_APP_BACKEND_BASE_URL}/coding-profiles/user/codeforces/${codeforcesUsername}`,
              );
              const cfData = await cfResponse.json();
              if (cfData && cfData.length > 0) {
                const { rating, rank, avatar,maxRating } = cfData[0];

                
                const latestContest = cfData[1]?.ratings?.[cfData[1].ratings.length - 1] || {};

                cfLeaderboard.push({
                  fullName: user.fullName,
                  admissionNumber: user.admissionNumber,
                  codeforcesProfile: user.codeforcesProfile,
                  rating: rating || 0,
                  maxRating:maxRating||0,
                  rank,
                  avatar,
                  latestContest: latestContest.contestName || "No contests",
                  contestRanking: latestContest.rank || "Not given",
                });

                if (rating) {
                  batchWiseData[batch].Codeforces.totalRating += rating;
                  batchWiseData[batch].Codeforces.userCount++;
                }
              }
            }

            // Fetch LeetCode data
            if (leetcodeUsername) {
              const lcResponse = await fetch(
                `${process.env.REACT_APP_BACKEND_BASE_URL}/coding-profiles/user/leetcode/${leetcodeUsername}`,
              );
              const lcData = await lcResponse.json();
              if (lcData.data) {
                const userContestRanking = lcData.data.userContestRanking || {};
                const totalSolved =
                  lcData.data.matchedUser?.submitStats?.acSubmissionNum[0]
                    ?.count || 0;
                lcLeaderboard.push({
                  fullName: user.fullName,
                  admissionNumber: user.admissionNumber,
                  leetcodeProfile: user.leetcodeProfile,
                  globalRanking: userContestRanking.globalRanking || "N/A",
                  rating: userContestRanking.rating || 0,
                  ContestAttended:
                    userContestRanking.attendedContestsCount || 0,
                  totalSolved,
                });
                if (userContestRanking && userContestRanking.rating) {
                  batchWiseData[batch].LeetCode.totalRating +=
                    userContestRanking.rating;
                  batchWiseData[batch].LeetCode.userCount++;
                  batchWiseData[batch].LeetCode.totalSolved += totalSolved;
                }
              }
            }

            // Fetch CodeChef data
            if (codechefUsername) {
              const ccResponse = await fetch(
                `${process.env.REACT_APP_BACKEND_BASE_URL}/coding-profiles/user/codechef/${codechefUsername}`,
              );
              const ccData = await ccResponse.json();
              if (ccData) {
                ccLeaderboard.push({
                  fullName: user.fullName,
                  admissionNumber: user.admissionNumber,
                  codechefProfile: user.codechefProfile,
                  rating_number: ccData.rating_number || 0,
                  rating: ccData.rating || 0,
                  globalRank: ccData.global_rank || "N/A",
                });
                if (ccData.rating_number) {
                  batchWiseData[batch].CodeChef.totalRating +=
                    ccData.rating_number;
                  batchWiseData[batch].CodeChef.userCount++;
                }
              }
            }
          }),
        );
        // Calculate average ratings for each batch on each platform
        Object.keys(batchWiseData).forEach((batch) => {
          const platformData = batchWiseData[batch];
          platformData.Codeforces.avgRating =
            platformData.Codeforces.userCount > 0
              ? (
                  platformData.Codeforces.totalRating /
                  platformData.Codeforces.userCount
                ).toFixed(2)
              : 0;
          platformData.LeetCode.avgRating =
            platformData.LeetCode.userCount > 0
              ? (
                  platformData.LeetCode.totalRating /
                  platformData.LeetCode.userCount
                ).toFixed(2)
              : 0;
          platformData.LeetCode.avgSolved =
            platformData.LeetCode.userCount > 0
              ? (
                  platformData.LeetCode.totalSolved /
                  platformData.LeetCode.userCount
                ).toFixed(2)
              : 0;
          platformData.CodeChef.avgRating =
            platformData.CodeChef.userCount > 0
              ? (
                  platformData.CodeChef.totalRating /
                  platformData.CodeChef.userCount
                ).toFixed(2)
              : 0;
        });

        // Sort leaderboards by rating in descending order
        cfLeaderboard.sort((a, b) => b.maxRating - a.maxRating);
        lcLeaderboard.sort((a, b) => b.rating - a.rating);
        ccLeaderboard.sort((a, b) => b.rating_number - a.rating_number);

        setUserData(data.users);
        setBatchData(batchWiseData);
        setCodeforcesLeaderboard(cfLeaderboard);
        setLeetcodeLeaderboard(lcLeaderboard);
        setCodechefLeaderboard(ccLeaderboard);

        const dataToStore = {
          users: data.users,
          batchData: batchWiseData,
          codeforcesLeaderboard: cfLeaderboard,
          leetcodeLeaderboard: lcLeaderboard,
          codechefLeaderboard: ccLeaderboard,
          lastUpdate: Date.now(),
        };
        localStorage.setItem('coding-profile-data', JSON.stringify(dataToStore));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
        {
          // alert(
          //   "Anyone who registered but didnot get their profile data then Go to Account Settings > Profile Privacy or similar settings and make it public.",
          // );
        }
      }
    };

    fetchUsers();
  }, []);

  const filterData = (data) => {
    return data.filter((user) =>
      Object.values(user).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  };

  const columns = {
    codeforces: [
      { Header: "Name", accessor: "fullName" },
      { Header: "Admission Number", accessor: "admissionNumber" },
      { Header: "Profile", accessor: "codeforcesProfile" },
      { Header:"MaxRating",accessor:"maxRating"},
      { Header: "Rating", accessor: "rating" },
      { Header: "Rank", accessor: "rank" },
      { Header: "Latest Contest", accessor: "latestContest" },
      { Header: "Contest Rank", accessor: "contestRanking" },
    ],
    leetcode: [
      { Header: "Name", accessor: "fullName" },
      { Header: "Admission Number", accessor: "admissionNumber" },
      { Header: "Profile", accessor: "leetcodeProfile" },
      { Header: "Global Ranking", accessor: "globalRanking" },
      { Header: "Rating", accessor: "rating" },
      { Header: "Total Solved", accessor: "totalSolved" },
      { Header: "Contest Attended", accessor: "ContestAttended" },
    ],
    codechef: [
      { Header: "Name", accessor: "fullName" },
      { Header: "Admission Number", accessor: "admissionNumber" },
      { Header: "Profile", accessor: "codechefProfile" },
      { Header: "rating_number", accessor: "rating_number" },
      { Header: "Rating", accessor: "rating" },
      { Header: "Global Rank", accessor: "globalRank" },
    ],
  };

  return (
    <div className="App text-gray-200 min-h-screen p-8">
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="mx-2 flex w-fit items-center justify-center gap-3 rounded-md bg-yellow-400/25 p-2 px-4 md:mx-auto ">
            <FaInfoCircle size={42} className="h-auto text-yellow-500" />
            <p className="w-[90%] text-xs text-white/80 md:w-full md:text-base">
              If you registered but did not get your coding profile data here in leaderboard, then go to 
              <Link
                to="/profile"
                className="mx-1 font-bold text-blue-500  underline underline-offset-4"
              >
                Profile Page
              </Link>
              and turn on "Share Your Coding Profile" feature.
            </p>
          </div>
          <div className="bg-gray-800 mt-12 rounded-lg p-6 pt-0 shadow-lg">
            {/* Upcoming Contests Component */}
            <UpcomingContests />
            <h2 className="mb-4 border-b border-blue-600 pb-2 text-3xl font-semibold text-blue-400">
              User Report by Platform and Batch
            </h2>
            <CustomBarChart batchData={batchData} />

            {/* Render Batch Data */}
            <div className="mb-8 mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Object.keys(batchData).map((batch) => (
                <BatchCard
                  key={batch}
                  batch={batch}
                  avgCodeforcesRating={batchData[batch].Codeforces.avgRating}
                  avgLeetcodeRating={batchData[batch].LeetCode.avgRating}
                  avgLeetcodeSolved={batchData[batch].LeetCode.avgSolved}
                  avgCodechefRating={batchData[batch].CodeChef.avgRating}
                />
              ))}
            </div>

            <h1 className="mb-4 border-b border-blue-600 pb-2 text-center text-3xl font-semibold  text-blue-400">
              Coding Profile Leaderboard
            </h1>

            {/* Search Bar Component */}
            <div className="mb-10 mt-10">
              <SearchBar placeholder="Search..." onChange={setSearchTerm} />
            </div>

            {/* Leaderboard Tables */}
            <h2 className="mb-4 border-b border-blue-600 pb-2 text-3xl font-semibold text-blue-400">
              Codeforces Leaderboard
            </h2>
            <SortableTable
              columns={columns.codeforces}
              data={filterData(codeforcesLeaderboard)}
            />

            <h2 className="mb-4 border-b border-blue-600 pb-2 text-3xl font-semibold text-blue-400">
              LeetCode Leaderboard
            </h2>
            <SortableTable
              columns={columns.leetcode}
              data={filterData(leetcodeLeaderboard)}
            />

            <h2 className="mb-4 border-b border-blue-600 pb-2 text-3xl font-semibold text-blue-400">
              CodeChef Leaderboard
            </h2>
            <SortableTable
              columns={columns.codechef}
              data={filterData(codechefLeaderboard)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cp;
