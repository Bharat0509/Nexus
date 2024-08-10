import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutgoingMail } from "react-icons/md";
import { SiGooglescholar } from "react-icons/si";
import { ImProfile } from "react-icons/im";

import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

const ModernProfile = ({ profile, isFaculty,img}) => {
  // console.log(img)
  return (
    <div className="relative h-[23rem] w-[18rem] flex-wrap overflow-hidden rounded-lg bg-white text-black shadow-lg hover:bg-blue-50 md:w-[16rem]">
      <div className="absolute -left-[5%]  top-0 h-[16rem] w-[20rem] overflow-hidden rounded-b-[50%] border-b-8 border-red-400 bg-red-500/20  md:h-[16rem] md:w-[18rem] ">
        <img
          src={
            // isFaculty
            //   ? profile.image
            //   // : `https://lh3.googleusercontent.com/d/1wuOKZh_DO8tEPCLZfHupGiziwr2BYJGQ`
              profile.image
            // img
          }
          alt="Person"
          // className="-z-10 flex h-full w-full cursor-pointer object-cover object-top transition-all duration-300 hover:scale-110"
        />
      </div>
      <div className=" mt-[15.5rem] px-5 py-4 ">
        <div className="mb-2 flex gap-2 ">
          {isFaculty ? (
            <>
              <Link to={profile.socialLinks.googleScholar} target="_blank">
                <SiGooglescholar
                  className="duration-400 rounded-sm border bg-[#3865c5] p-1 text-white  
                        transition-all hover:border-[#3865c5] hover:bg-transparent hover:text-[#3865c5]"
                  size={24}
                />
              </Link>
              <Link to={profile.socialLinks.googleSite} target="_blank">
                <ImProfile
                  className="duration-400 rounded-sm border bg-[#22272c] p-1 text-white  
                        transition-all hover:border-[#75787B] hover:bg-transparent hover:text-[#22272c]"
                  size={24}
                />
              </Link>
            </>
          ) : (
            <>
              {Object.keys(profile.socialLinks).map((key) => {
                if (!profile.socialLinks[key].length) return null;
                return (
                  <SocialIcon
                    key={key}
                    url={profile.socialLinks[key]}
                    style={{ height: "1.8rem", width: "1.8rem" }}
                  />
                );
              })}
            </>
          )}
        </div>
        <h3 className="mb-.5 text-xl font-bold">{profile?.name}</h3>
        <div className="flex items-center justify-between">
          <h4 className="text-red-600">{profile?.role}</h4>
          <Link to={`mailto:${profile?.email ?? "abc@gmail.com"}`}>
            {" "}
            <MdOutgoingMail
              className="h-8 w-8 cursor-pointer rounded-full p-1 text-red-600 hover:bg-red-200 "
              title="Write an Email "
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModernProfile;


