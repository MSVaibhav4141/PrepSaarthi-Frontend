import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { io } from "socket.io-client";
import SendIcon from '@mui/icons-material/Send';  
import { useSelector, useDispatch } from "react-redux";
import { allMentorConnection, clearError, getAllChats, getAllChatsStu, reset } from '../../action/userAction';
import toast from 'react-hot-toast';
import DoneIcon from '@mui/icons-material/Done';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Loader from '../../Components/Loader/Loader';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllConnectionsStu } from '../../action/studentAction';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const ChatService = ({userId, role, userAvatar}) => {
    const [tempUserChat, setTempUser] = useState(null)
    const [message, setMessage] = useState([])
    const recipientIdRef = useRef(null);  
    const [loadedUsers, setLoadedUsers] = useState([])
    const [convo, setConvo] = useState([])
    const [isTyping, setTyping] = useState(false)
    const {error,loading , chats} = useSelector(state => state.mentorChat)
    const [socketLoader, setLoader] = useState(false)
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch()
    const [position, setPosition] = useState(0)
    const location = useLocation();
    const [activeConnection, setActiveConnection] = useState([])
    const reciverId = location.state?.reciverId;
    const [chatRemain, setChatRemain] = useState(500)
    const name = location.state?.name;
    const senderId = location.state?.senderId;
    const loggedinUser = useRef(null)
    const [messageLoader, setMessageLoader] = useState(false)
    const avatar = location.state?.avatar;
    const [zIndexApp, setIndex] = useState(111);
    const scrollRef = useRef(null);
    const navigate = useNavigate()
    let typingTimeout;
    const [typingstate,setTypingState] = useState({})
    const [seenOpen, setSeen] = useState(false)
    const [seenTarger, setTarget] = useState(null)
    const styles = {
      searchContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
      },
      searchInput: {
        width: '100%',
        padding: '12px 20px',
        fontSize: '16px',
        border: '1px solid #dfe1e5',
        borderRadius: '24px',
        boxShadow: '0px 1px 6px rgba(32, 33, 36, 0.28)',
        outline: 'none',
        transition: 'all 0.3s ease',
      },
      buttonContainer: {
        position: 'relative',
        minWidth: '70px',
        minHeight: '70px',
        marginLeft:'-7px'
      },
      button: {
        position: 'absolute',
        top: '50%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        left: '50%',
        transform:'translate(-50%,-50%)',
        width: '60%',
        height: '60%',
        backgroundColor: '#4285f4',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '16px',
        outline: 'none',
        zIndex: '1',
      },
      svgCircle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform:'translate(-50%,-50%)',
        width: '70%',
        height: '70%',
        zIndex: '0',
      }
    };

    useEffect(() => {
      if(senderId && loading){
        joinChat(senderId)
      }
    }, [senderId, loading])
    
    // Scroll to the bottom whenever convo changes
    const { connection, loading:menConLoading } = useSelector(
      (state) => state.getAllConnectionStuPast  //thia
    );
    const {
      success: connSuccess,
      loading: connLoading,
    } = useSelector((state) => state.getAllConnectionMenPast);
    const socket = useMemo(
      () =>
        io(import.meta.env.VITE_API_URL, {
            withCredentials: true
           }),
        []
      );

      const radius = 24; // Adjusted radius
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - ((((500-chatRemain+message?.length)/500)*100) / 100) * circumference;
      
      useEffect(() => {
        if(role === 'mentor'){
          dispatch(allMentorConnection())
          dispatch(getAllChats())
        }
        if(role === 'student'){
          dispatch(getAllConnectionsStu());
          dispatch(getAllChatsStu())
        }
        return () => {
          dispatch(reset())
        }
      }, [dispatch, role ])

   
      useEffect(() => {
        if(role === 'mentor'){
        const activeConnections = connSuccess?.connection?.filter(
          (item) => item.isActive
        );
        setActiveConnection(activeConnections)
      }
      if(role === 'student'){
        const isConnection = connection?.connection?.filter((item) => item.isActive);
        setActiveConnection(isConnection)
      }
      }, [connSuccess,connection,role ])
      
      useEffect(() => {
        if(userId)
        loggedinUser.current = userId
      }, [userId])
  
      useEffect(() => {
        if(loading === false && name && avatar && reciverId){
        if( loadedUsers?.length > 0){
          const index = loadedUsers.findIndex(obj => obj?.id === reciverId);
          if(index === -1){
            setTempUser({
              name,
              avatar,
              reciverId
            })
          }
        }else{
          setTempUser({
            name,
            avatar,
            reciverId
          })
        }}
      
      }, [loadedUsers,reciverId,name, avatar,loading])
      useEffect(() => {
       if(error){
        toast.error(error.message + 'ddd')
        dispatch(clearError())
       } 
       if(chats){
       }
      }, [chats, error,dispatch])
      
      useEffect(() => {
      
     
        socket.on('mystatus', ({userId, status}) => {
          updateUserStatus(userId, status);
        })
        // socket.on('welcome', (m) => {
        //     console.log(m)
        // })
        // socket.on('recive', (m) =>{
        //     setConvo((chat) => [...chat,m ])
        // })
  
        socket.on('recive-message', ({message, age, name, avatar,status,chatLeft}) => {
          if(age === 'new'){
             setLoadedUsers((prev) => {
              return [message, ...prev]
            })
             setMessageLoader(false)
            }
            if(age === 'old'){
              if((recipientIdRef.current === message?.senderId) || (message?.senderId === loggedinUser.current)){
                setChatRemain(chatLeft)
                setConvo((convo) => [...convo, message])
                setLoadedUsers((prevChats) => {
                  const index = prevChats?.findIndex(item => item?.chatId === message?.chatId);
                  
                  // If the chat exists
                  if (index !== -1) {

                    const updatedArr = [...prevChats]; // Create a shallow copy of prevChats
                    const chatToMove = updatedArr.splice(index, 1)[0]; // Remove the chat from its current position
                    
                    // Return the updated array with the chat at the top
                    return [{...chatToMove,message:message?.content, unseenFor:message?.reciverId}, ...updatedArr];
                  }
                  // If the chat isn't found, return the array as is
                  return [{avatar, chatId:message?.chatId,id:message?.reciverId, message:message?.content, name, senderId:message?.senderId, status,unseenFor:message?.reciverId, time:message?.timeStamp},...prevChats];
                });
                setTempUser(null)
              }else{
                setLoadedUsers((prevArr) => {
                  // Find the index of the chat you want to move
                  const index = prevArr.findIndex((chat) => chat?.chatId === message?.chatId);
                  // If the chat is found, remove it from the array and add it to the front
                  if (index !== -1) {
                    const updatedArr = [...prevArr];
                    const chatToMove = updatedArr.splice(index, 1)[0]; // Remove the chat from the array
                    return [{...chatToMove, unreadChat:chatToMove?.unreadChat + 1, message:message?.content,isHighlighted:true,unseenFor:message?.reciverId}, ...updatedArr]; // Add the chat to the front
                  }
                  return prevArr;
                });
              }
              setMessageLoader(false)
              // setConvo((convo) => [...convo, message])
            }

        })
        socket.on('chat-retrival', ({message, chatId}) => {
          
          setConvo(message)
          setLoadedUsers((prevUsers) => {
              const index = prevUsers.findIndex(user => user?.chatId === chatId);
              if (index === -1) return prevUsers; // No change if the item is not found
              const updatedUsers = [...prevUsers]; // Make a shallow copy of the array
              updatedUsers[index] = {
                ...updatedUsers[index], 
                unreadChat: 0, 
                isHighlighted: false 
              }; // Update only the necessary item
            
              return updatedUsers;
            });
     
            setLoader(false)
            setPosition(-200)
            setIndex(1111)
        })
        return () => {
          socket.disconnect();
        };
      }, []);

      useEffect(() => {
        if(userId)
        socket.emit('status', userId)
      }, [userId])

      useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, [convo]);
      useEffect(() => {
        if(chats?.length > 0){
          const chatsId = chats.map((item) => {
            if(item.chatDetails.studentId === userId){
              return item.chatDetails.mentorId
            }else{
              return item.chatDetails.studentId
            }
          })

          socket.emit('getonlineusers', chatsId )
          socket.on('onlineusers', (users) => {
            const allConnectedUSers = chats?.map((i) => {
              if(i?.chatDetails?.studentId === userId) {
                if(users.includes(i?.chatDetails?.mentorId)){
                  return{
                    name:i?.mentorDetails[0]?.name,
                    id:i?.mentorDetails[0]?.id,
                    avatar:i?.mentorDetails[0]?.avatar,
                    status:'online',
                    message:i?.mostRecentMessage?.content,
                    senderId:i?.mostRecentMessage?.senderId,
                    time:i?.mostRecentMessage?.timeStamp,
                    chatId:i?._id,
                    isHighlighted:i?.isHighlighted,
                    unreadChat:i?.unreadCount,
                    unseenFor:i?.notification?.unseenFor
                  }
                }
                else{
                  return{
                    name:i?.mentorDetails[0]?.name,
                    id:i?.mentorDetails[0]?.id,
                    avatar:i?.mentorDetails[0]?.avatar,
                    status:'offline',
                    message:i?.mostRecentMessage?.content,
                    senderId:i?.mostRecentMessage?.senderId,
                    time:i?.mostRecentMessage?.timeStamp,
                    chatId:i?._id,
                    isHighlighted:i?.isHighlighted,
                    unreadChat:i?.unreadCount,
                    unseenFor:i?.notification?.unseenFor
                  }
                }
              }else{

                if(users?.includes(i?.chatDetails?.studentId)){
                  return{
                    name:i?.studentDetails[0]?.name,
                    id:i?.studentDetails[0]?.id,
                    avatar:i?.studentDetails[0]?.avatar,
                    status:'online',
                    message:i?.mostRecentMessage?.content,
                    senderId:i?.mostRecentMessage?.senderId,
                    time:i?.mostRecentMessage?.timeStamp,
                    chatId:i?._id,
                    isHighlighted:i?.isHighlighted,
                    unreadChat:i?.unreadCount,
                    unseenFor:i?.notification?.unseenFor
                  }
                }
                else{
                  return{
                    name:i?.studentDetails[0]?.name,
                    avatar:i?.studentDetails[0]?.avatar,
                    id:i?.studentDetails[0]?.id,
                    status:'offline',
                    message:i?.mostRecentMessage?.content,
                    senderId:i?.mostRecentMessage?.senderId,
                    time:i?.mostRecentMessage?.timeStamp,
                    chatId:i?._id,
                    isHighlighted:i?.isHighlighted,
                    unreadChat:i?.unreadCount,
                    unseenFor:i?.notification?.unseenFor
                  }
                }
              }
            })
  
            setLoadedUsers(allConnectedUSers)
            setTempUser(null)
          })
        }
      }, [chats,userId])

    //   const joinRoom = () => {
    //     socket.emit('room', {room, prev})
    //     setPrev(room)
    //   }
  

      const handleSubmit = () => {
        // if(containsNumbers(message)){
          
        //   return;
        // }
        setTyping(false)
        setMessageLoader(true)
        socket.emit('send-message', {chatId:'', senderId:userId, content:message,userId:recipientIdRef.current, role})
        setMessage('')
      }
      const joinChat = (id) => {
        if(role === 'student'){
          const chat = chats?.find(item => item?.chatDetails?.mentorId === id)
          const chatLeft = chat?.chatDetails?.chatLeft
          setChatRemain(chatLeft || 500)
        }
        recipientIdRef.current = id;
        setConvo([])
        setLoader(true)
        
        socket.emit('join-chat', ({loged:userId ,userId:id, role}))
      }

      // useEffect(() => {
      //   // recipientIdRef.current = ''
      //   if(userId && role){
      //   joinChat('66853b43b9c0bb15ad2cc7df')
      //   }
      // },[userId, role])
      const updateUserStatus = (userId, status) => {
        setLoadedUsers(prevUsers =>
          prevUsers.map(user => 
            user?.id === userId ? { ...user, status } : user
          )
        );
      };
      const ChatCard = ({item,id}) => (
        
        <Card
        sx={(item?.isHighlighted && item?.unseenFor === userId) ?  {
          display: "flex",
          bgcolor:'#ffda84',
          width: { xs: "96%", md: "95%" },
          position:'relative',
          height: {
            xs: "13vmax",
            md: "15vmax",
            lg: "8.2vmax",
          },
          borderRadius: "1vmax",
          boxShadow: "-1px 1px 14px -5px rgba(0,0,0,0.4)",
          alignItems: "center",
          margin: "8px auto",
        } : {
          bgcolor:'#95c0ea',
          position:'relative',
          display: "flex",
          width: { xs: "96%", md: "95%" }, 
          height: {
            xs: "13vmax",
            md: "15vmax",
            lg: "8.2vmax",
          },
          borderRadius: "1vmax",
          boxShadow: "-1px 1px 14px -5px rgba(0,0,0,0.4)",
          alignItems: "center",
          margin: "8px auto",
        }}
        onClick={() => {joinChat(id)}
}      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: 80, sm: 100, md: 115 },
            height: { xs: 80, sm: 100, md: 115 },
            p: "1vmax",
            aspectRatio: "1/1",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          image={item?.avatar?.public_URI || item?.avatar}
          alt={item?.name}
        />
        <FiberManualRecordIcon sx={item?.status === 'online' ? {color:'green'} : {color:'black'}}/>
        <Box
          sx={{ display: "flex", flexDirection: "column",justifyContent:'center',height:'100%' }}
        >
          <CardContent>
            <Typography
              component="p"
              variant="p"
              sx={{
                fontSize: { xs: "2.2vmax", md: "1.2em" },
                fontWeight: 600,
              }}
            >
              {item?.name}
            </Typography>
            <Typography
              variant="p"
              color="text.secondary"
              component="p"
              sx={{
                fontSize: { xs: "2vmax", md: "1em" },
                fontWeight: 500,
             
              }}
            >
               {(typingstate?.isTyping &&  typingstate?.userId === id )? (
          <>Typing</>
        ): (((item?.content?.length > 16 || item?.message?.length > 16) && window.innerWidth > 900)) ? ((item?.content || item?.message)?.substr(0,16) + '...'): (((item?.content || item?.message)?.length > 25)?(((item?.content || item?.message)?.substr(0,25))+'...'):(item?.content || item?.message))}
           {}
            </Typography>
          </CardContent>
         
        </Box>

       {(item?.unseenFor === userId && item?.unreadChat > 0) && (
        <Box sx={{color:'white',position:'absolute', top:'50%', right:'15px', transform:'translateY(-50%)', bgcolor:'#ff9b01', borderRadius:'50%', p:'1vmax', width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
          {item?.unreadChat}
        </Box>
       )}
      </Card>
      )
  

      function convertToIST(timestamp) {
        const date = new Date(timestamp);
        const options = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false  // 24-hour format
        };
        return new Intl.DateTimeFormat('en-IN', options).format(date);
      }

      
      useEffect(() => {
        socket.on('message-delivered', (messageIds) => {
          setConvo(prevConvo => {
           return prevConvo?.map(i => {
           if( messageIds?.includes(i?._id)){
            return {
              ...i,
              delivered:true
            }
           }else{
            return i
           }
           });
          });
        });
        socket.on('message-seen', (messageIds) => {
          setConvo(prevConvo => {
            return prevConvo?.map(i => {
              const foundMessage = messageIds.find(msg => msg._id === i?._id);
              
              if (foundMessage) {
                return {
                  ...i,
                  seen: true,
                  seenAt: foundMessage?.seenAt || i.seenAt 
                };
              } else {
                return i;
              }
            });
          });
        });

        socket.on('set-typing', ({isTyping,userId}) => {
          setTypingState({isTyping, userId})
        })
        
        return () => {
          socket.off('message-delivered');  
        };
      }, [socket]);
      useEffect(() => {

        socket.emit('handle-typing', {isTyping, reciverID:recipientIdRef.current, userId})
      }, [isTyping,socket,userId])

    
      useEffect(() => {
        socket.on('errors', ({errorType, message}) => {
          if(errorType === 'message-limit'){
          toast.error(message)
          setMessageLoader(false)
          }
          if(errorType === 'noMessage'){
          toast.error(message)
          setMessageLoader(false)
          }
          if(errorType === 'restrictedContent'){
          toast.error(message)
          setMessageLoader(false)
          }
          if(errorType === 'nouserFound'){
          toast.error(message)
          setMessageLoader(false)
          }
        })
      },[socket])
      const seenAtToggle = (key,val) => {
        setTarget(key)
        setSeen(prev => key === seenTarger ? !prev : prev === false ? !prev : prev)
      }
      
  return (
    <>
    {loading ? <Loader /> :
     <>
      <Box display={'flex'} sx={{width:'100vw',height:'calc(100vh)', overflowY:'hidden', position:'absolute', top:0,left:0, zIndex:{xs:zIndexApp,md:1111}, padding:{md:'10px'}, bgcolor:'#b4c6da'}}> 
      <Box sx={{width:{xs:'100vw',md:'32vw'},height:{xs:'calc(100% - 70px)', md:'100%'}, borderRight:'0.3px solid #b8b8b8', overflowY:'scroll', position:{xs:'absolute', md:'static'}, top:'70px', left:`${position}vw`,zIndex:2, bgcolor:'white', transition:'0.5s',borderRadius:'10px 0px 0px 30px '}}>
        <Box sx={{width:'98%' ,height:'70px',borderRadius:'0 35px 35px 0' ,display:{xs:'none',md:'flex'}, alignItems:'center',bgcolor:'var(--theme2)' ,position:'sticky', top:0, zIndex:1000 }}>
       <ArrowBackIosIcon  onClick={() => navigate(`/user/${userId}`)} sx={{color:'white', ml:'1.4vmax', cursor:'pointer', fontSize:'22px'}} />
          <Typography component={'p'} sx={{color:'white', fontWeight:600, fontSize:'22px', ml:'0.3vmax',display:'flex',alignItems:'center'}}>Chats<Typography onClick={() => navigate('/')} component={'span'} sx={{fontSize:'10px', fontStyle:'italic', cursor:'pointer'}}>@PrepSaarthi</Typography></Typography>
          {/* <Typography component={'p'} sx={{color:'white', width:'100%' ,fontWeight:400, fontSize:'1vmax', m:'0 1.2vmax',justifyContent:'end',height:'100%', display:'flex', alignItems:'end', fontStyle:'italic'}}>@PrepSaarthi</Typography> */}
          <CardMedia 
    component={'img'} 
    sx={{
      marginRight:'1vmax',
      width: '60px',
      aspectRatio: '1/1',
      borderRadius: '50%',
      ml: 'auto', // This will push it to the end
    }} 
    src={userAvatar?.public_URI}
  />        </Box>
      {tempUserChat !== null && (
          <ChatCard item={tempUserChat} id={reciverId}/>
      )}
    
    {(loadedUsers?.length === 0 && tempUserChat === null) ? 
    <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 800,
      color: 'grey',
      textAlign: 'center',
    }}
  >
    <h2 style={{ marginBottom: '8px' }}>
    It looks like you haven't had any conversations yet.

</h2>

    <p>
     Connect with a {role === 'student' ? <>mentor</> : <>student</>} to start your chat journey!
    </p>
  </Box>
   : <>
    {loadedUsers?.map((i, key) => (
      <ChatCard key={key} item={i} id={i?.id}/>
      
    ))}
    </>}
      </Box>
      <Box sx={{width:{xs:'100vw',md:'68vw'},height:{xs:'100vh', md:'calc(100vh - 20px)'},position:{xs:'absolute', md:'relative'}, bgcolor:'white', borderRadius:'0 10px 10px 0 ', overflow:'hidden'}}>
    {recipientIdRef.current && <Box sx={{width:{xs:'100vw',md:'67vw'},ml:'auto', height:'70px',bgcolor:'var(--theme2)', display:'flex', alignItems:'center', borderRadius:{md:'0px 0 0 0px'}}}>
        <ArrowBackIosIcon onClick={()=>{setPosition(0) 
        setIndex(111)
          recipientIdRef.current =null}
        } sx={{display:{md:'none'}, color:'white', ml:'10px'}}/>
      <Box sx={{mr:'10px'}}>
        <CardMedia component={'img'} sx={{width:'60px', height:'60px', borderRadius:'50%', objectFit:'cover', objectPosition:'center', ml:{md:'12px'}}} src={(loadedUsers?.find(item => item?.id === recipientIdRef.current))?.avatar?.public_URI || tempUserChat?.avatar}></CardMedia>
      </Box>
      <Box>
        <Typography component={'p'} sx={{fontSize:'1.2em', fontWeight:'600'}} >{(loadedUsers?.find(item => item?.id === recipientIdRef.current))?.name || tempUserChat?.name}</Typography>
        <Typography component={'p'} >{typingstate?.isTyping  ? <Typography sx={{color:'green'}}>Typing...</Typography> : (loadedUsers?.find(item => item?.id === recipientIdRef.current))?.status || (<Typography>offline</Typography>)}</Typography>
      </Box>
    </Box>}
    {recipientIdRef.current === null && (
    <Box sx={{ width:{xs:'100vw',md:'68vw'},overflowY:'scroll', height:'calc(100% - 140px)',display:{xs:'none', md:'flex'}, flexDirection:'column', padding:'10px 0',alignItems:'center',color:'grey', fontSize:'1.2vmax',fontWeight:'800',justifyContent:'center', overflowX:'hidden','&::-webkit-scrollbar':{ display: 'none',},'-ms-overflow-style': 'none', 'scrollbar-width': 'none'}}>{!tempUserChat && loadedUsers?.length === 0? <>You currently have no users to chat with.</> :<>  There are no conversation to begin withChoose a chat to dive into your conversation</>}</Box>

    )}
     {(!connLoading && !menConLoading)&& (
     <>
     {socketLoader ? <Loader/> : (
          <Box ref={scrollRef} sx={{ width:{xs:'100vw',md:'100%'}, overflowY:'scroll', height:'calc(100% - 140px)',display:'flex', flexDirection:'column', padding:'10px 0', overflowX:'hidden','&::-webkit-scrollbar':{ display: 'none',},'-ms-overflow-style': 'none', 'scrollbar-width': 'none'}}>
          {convo?.length > 0 && convo?.map((i, key) => (
            <>
            
            {
  `${new Date(i?.timeStamp).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Kolkata'
  })}` !==
    `${new Date(convo[key - 1]?.timeStamp).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    })}` &&
    (() => {
      const currentDate = new Date(i?.timeStamp);
      const previousDate = new Date(convo[key - 1]?.timeStamp);
      const previousDate1 = new Date(convo[key - 1]?.timeStamp);
      const today = new Date();
      console.log(i)
      // Normalize to remove time (so comparisons are just by date)
      today.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      previousDate.setHours(0, 0, 0, 0);
      previousDate1.setHours(0, 0, 0, 0);

      const oneDay = 24 * 60 * 60 * 1000;
      const diffFromPrevMessage = Math.ceil((currentDate - previousDate) / oneDay);
      const diffFromPrevMessage1 = Math.ceil((currentDate- previousDate1) / oneDay);
      const diffFromToday = Math.ceil((today - currentDate) / oneDay);
      // console.log(diffFromPrevMessage, diffFromToday, i.content, previousDate, currentDate,today)
      console.log(diffFromPrevMessage1, previousDate1, i.content, today)

      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: {xs:'30%', md:'20%'},
            m: '10px auto',
            py: 1,
            backgroundColor: '#fffbce',
            borderRadius: '16px',
            color: '#6f6f6f',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            textAlign: 'center',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          { 
          
            (diffFromToday === 0) ? "Today" : // If message is sent today
            (diffFromPrevMessage === 1 || !diffFromPrevMessage)  && diffFromToday === 1 ? "Yesterday" : // If message is from the previous day
            currentDate.toLocaleDateString('en-IN', { 
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              timeZone: 'Asia/Kolkata'
            })
          }
        </Box>
      );
    })()
}
  

            <Box   onClick={() => i?.senderId === userId && seenAtToggle(key,true)} display={'flex'}sx={i?.senderId === userId ? {
              alignSelf:'flex-end',
              padding:'4px',
              bgcolor:'#bedfff',
              borderRadius:'5px',
              margin:'1.5px 5px',
              cursor:'pointer'
            }:{bgcolor:'#ffe5a9',
              margin:'1.5px 5px',
              borderRadius:'5px',
              alignSelf:'flex-start',
              padding:'4px',
         
            }}>
            <Box sx={{wordWrap: 'break-word',  
              maxWidth:'30vmax',
              whiteSpace: 'normal',}}  key = {key}>{i?.content}</Box>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-end', marginLeft:'1px'}}>
              <Box component={'span'} sx={{fontSize:'0.8vmax', mt:'8px', ml:'3px'}} >
           {convertToIST(i.timeStamp)}
           </Box>
          </Box>
         {i?.senderId === userId  && (
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-end', marginLeft:'1px'}}>
          <Box component={'span'} sx={{fontSize:'0.8vmax'}} >
       {i?.seen ? <DoneAllIcon  sx={{color:'green'}}/> : (i?.delivered ? <DoneAllIcon/> : <DoneIcon />)} 
       </Box>
      </Box>
         )} 
          </Box>
          <Box display={(seenOpen && seenTarger === key) ? 'flex' : 'none'} sx={{
              alignSelf:'flex-end',
              padding:'2px',
              bgcolor:'#eeeeee',
              borderRadius:'5px',
              margin:'0 5px',
              marginBottom:'10px',
              marginTop:'2px',
              fontSize:{xs:'1.26vmax',md:'0.7vmax'},
              cursor:'pointer'
            }}>{i?.delivered && i?.seen ? (<>Delivered At :{new Date(i?.deliveredAt)?.toLocaleDateString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              timeZone: 'Asia/Kolkata'
            })}   Seen At:{new Date(i?.seenAt)?.toLocaleDateString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              timeZone: 'Asia/Kolkata'
            })}</>) : (i?.delivered && <>Delivered At: {new Date(i?.deliveredAt)?.toLocaleDateString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              timeZone: 'Asia/Kolkata'
            })}</>)} </Box>
          </>
          ))}
          {activeConnection?.find((item) => item?.mentorDetails?._id === recipientIdRef.current) ? (
  <>{recipientIdRef.current && (
     <Box sx={{position:'absolute', bottom:0, width:'100%',bgcolor:'#eaeaea',padding:'0 5px'}}>
     <div style={styles.searchContainer}>
          <input
          disabled={messageLoader}
      value={message}
          onChange={(e) => {
            setMessage(e.target.value)
        
              setTyping(true)
              clearTimeout(typingTimeout);
              typingTimeout = setTimeout(() => {
               setTyping(false)
              }, 1300);
            
            }}
            type="text"
            placeholder="Type your message..."
            style={styles.searchInput}
          />
          <div style={styles.buttonContainer}>
            <svg
              style={styles.svgCircle}
              width="52" // Adjusted width
              height="52" // Adjusted height
              viewBox="0 0 52 52"
            >
              <circle
                cx="26" // Centered x position
                cy="26" // Centered y position
                r={radius} // Radius for the circle// Black stroke
                strokeWidth="4" // Stroke width increased for visibility
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            <button onClick={handleSubmit} disabled={message?.length === 0 || message?.length >= chatRemain} style={styles.button}><SendIcon /></button>
          </div>
        </div>
    {/* <LoadingButton loading={messageLoader} onClick={handleSubmit}>Send</LoadingButton> */}
    </Box>
  )}</>
          ):<>{
    recipientIdRef.current && (
      <Box sx={{position:'absolute', bottom:0, width:'100%',bgcolor:'#eaeaea',padding:'0 0 0 10px'}}>
      {role === 'student'?<>
        <div style={styles.searchContainer}>
            <input
                    disabled={messageLoader}
        value={message?.slice(0,chatRemain)}
            onChange={(e) => {
              setMessage(e.target.value)
              if(message?.slice(0,chatRemain)?.length < chatRemain){
                setTyping(true)
                clearTimeout(typingTimeout);
                typingTimeout = setTimeout(() => {
                 setTyping(false)
                }, 1300);
              }
              }}
              type="text"
              placeholder="Type your message..."
              style={styles.searchInput}
            />
            <div style={styles.buttonContainer}>
              <svg
                style={styles.svgCircle}
                width="52" // Adjusted width
                height="52" // Adjusted height
                viewBox="0 0 52 52"
              >
                <circle
                  cx="26" // Centered x position
                  cy="26" // Centered y position
                  r={radius} // Radius for the circle
                  stroke={message?.length>= (chatRemain) ? 'red' : 'black'} // Black stroke
                  strokeWidth="4" // Stroke width increased for visibility
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <button onClick={handleSubmit} disabled={message?.length === 0 || message?.length >= chatRemain || messageLoader} style={styles.button}>{messageLoader? <CircularProgress size="30px" /> :<SendIcon /> }</button>
            </div>
          </div></>:<>
          <div style={styles.searchContainer}>
            <input
        value={message}
            onChange={(e) => {
              setMessage(e.target.value)
          
                setTyping(true)
                clearTimeout(typingTimeout);
                typingTimeout = setTimeout(() => {
                 setTyping(false)
                }, 1300);
              
              }}
              type="text"
              placeholder="Type your message..."
              style={styles.searchInput}
            />
            <div style={styles.buttonContainer}>
              <svg
                style={styles.svgCircle}
                width="52" // Adjusted width
                height="52" // Adjusted height
                viewBox="0 0 52 52"
              >
                <circle
                  cx="26" // Centered x position
                  cy="26" // Centered y position
                  r={radius} // Radius for the circle// Black stroke
                  strokeWidth="4" // Stroke width increased for visibility
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <button onClick={handleSubmit} disabled={message?.length === 0 || message?.length >= chatRemain || messageLoader} style={styles.button}>{messageLoader? <CircularProgress size="30px" /> :<SendIcon /> }</button>
            </div>
          </div></>}
      
      </Box>
    )
          }</>}
        
        </Box>
     )}
     </>
      )}
     
      {/* { recipientIdRef.current === null ? <>Please select a chat</> : 
      <Box sx={{position:'absolute', bottom:0, width:'100%',bgcolor:'green'}}>
         {console.log(activeConnection)}
      <TextField type='text' disabled={messageLoader} onChange={(e) => {setMessage(e.target.value)
      setTyping(true)
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        setTyping(false)
      }, 1300);
      }} value={message} label='Message' variant='outlined'></TextField>
      <LoadingButton loading={messageLoader} onClick={handleSubmit}>Send</LoadingButton>
      </Box>} */}
        
        </Box>
    </Box>
    </> }

   </>
  )
}

export default ChatService