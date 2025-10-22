import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Applications = () => {

  const {user}=useUser()
  const {getToken}=useAuth()
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const [matchData, setMatchData] = useState(null)
  const [matchingJobId, setMatchingJobId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const {backendUrl,userData,userApplications,fetchUserData,fetchUserApplications}=useContext(AppContext)

  const updateResume = async () => {
    try {
        const formData = new FormData();
        formData.append('resume', resume)

        const token = await getToken()

        const { data } = await axios.post(backendUrl+'/api/users/update-resume', 
          formData,
        {headers: { Authorization: `Bearer ${token}` }}
        )

        if (data.success) {
        toast.success(data.message)
          await fetchUserData()
        } else {
          toast.error(data.message)
        }
    } 
    catch(error){
      toast.error(error.message)
    }

    setIsEdit(false)
    setResume(null)
  }

  const handleMatch = async (jobId) => {
    try {
      setLoading(true)
      setMatchingJobId(jobId)
      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/users/match-resume', 
        { jobId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        console.log(data.matchData)
        setMatchData(data.matchData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);
  

      
 
 return (
   <>
     <Navbar />
     <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
       <h2 className='text-xl font-semibold'>Your Resume</h2>
       <div className='flex gap-2 mb-6 mt-3'>
         {
           isEdit || userData && userData.resume===""
           ? <>
           <label className='flex items-center' htmlFor="resumeUpload">
             <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : "Select Resume"}</p>
             <input id='resumeUpload' onChange={e=>{setResume(e.target.files[0])}}
               accept="application/pdf"
               type="file" hidden/>
               <img src={assets.profile_upload_icon} alt="" />

           </label>
           <button onClick={updateResume} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
         </>
           : <div className='flex gap-2'>
              <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href={userData.resume} target='_blank'>
                Resume
              </a>
              <button onClick= {()=>setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>
                Edit
              </button>
             </div>
         }
       </div>
       <h2 className='text-xl font-semibold mb-4'>Job Applied</h2>
       <table className='min-w-full bg-white border rounded-lg'>
        <thead>
          <tr>
            <th className='py-3 px-4 border-b text-left'>Company</th>
            <th className='py-3 px-4 border-b text-left'>Job Title</th>
            <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
            <th className='py-3 px-4 border-b text-left max-sm:hidden '>Date</th>
            <th className='py-3 px-4 border-b text-left'>Status</th>
            <th className='py-3 px-4 border-b text-left'>Match %</th>
          </tr>
        </thead>
        <tbody>
          {userApplications.filter(job => job.jobId && job.companyId).map((job,index)=> (
            <tr key={index}>
              <td className='py-3 px-4 flex items-center gap-2 border-b'>
                <img className='w-8 h-8'src={job.companyId.image} alt="" />
                {job.companyId.name}
              </td>
              <td className='py-2 px-4 border-b'>{job.jobId.title}</td>
              <td className='py-2 px-4 border-b max-sm:hidden' >{job.jobId.location}</td>
              <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
              <td className='py-2 px-4 border-b'>
              <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status==='Rejected'? 'bg-red-100' :'bg-blue-200' } px-4 py-1.5 rounded `}>
                {job.status}
              </span>
              </td>
              <td className='py-2 px-4 border-b'>
                {(() => {
                  if (matchingJobId === job.jobId._id) {
                    if (loading) {
                      return <p>Loading...</p>;
                    } else {
                      return <button onClick={() => navigate('/analytics', { state: { matchData } })} className='bg-green-500 text-white px-4 py-1.5 rounded-lg'>View Analytics</button>;
                    }
                  } else {
                    return <button onClick={() => handleMatch(job.jobId._id)} className='bg-blue-500 text-white px-4 py-1.5 rounded-lg'>Check</button>;
                  }
                })()}
              </td>
            </tr>
          ))}
        </tbody>
       </table>
     </div>
     {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Match Details</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500"><b>Percentage Match:</b> {matchData?.percentageMatch}</p>
                <p className="text-sm text-gray-500"><b>Strong Points:</b> {matchData?.strongPoints}</p>
                <p className="text-sm text-gray-500"><b>Improvement Suggestions:</b> {matchData?.improvementSuggestions}</p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus://Users/mac/Desktop/Project/job-portal/cilent/src/pages/Applications.jsx: Missing semicolon. (152:39)
  155 | 
/Users/mac/Desktop/Project/job-portal/cilent/src/pages/Applications.jsx:152:39
150|                        // ... (rest of the component)
151|                      
152|                                        } else {
   |                                         ^
153|                                          return <button onClick={() => navigate('/analytics', { state: { matchData } })} className='bg-green-500 text-white px-4 py-1.5 rounded-lg'>View Analytics</button>;
154|                                        }
ring-blue-300"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
     <Footer />
   </>
 )
}

export default Applications