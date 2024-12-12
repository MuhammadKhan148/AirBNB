// // wanderlust-react/src/components/Notifications.jsx
// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const Notifications = () => {
//     const [notifications, setNotifications] = useState([]);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem('token');

//         const socket = io('http://localhost:8080', {
//             auth: {
//                 token: token,
//             },
//         });

//         socket.on('connect', () => {
//             console.log('Connected to Socket.IO server');
//         });

//         socket.on('newBooking', (data) => {
//             setNotifications(prev => [data, ...prev]);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     return (
//         <div className="notifications position-relative ms-3">
//             <button type="button" className="btn btn-primary" onClick={toggleDropdown}>
//                 Notifications <span className="badge bg-secondary">{notifications.length}</span>
//             </button>
//             {isDropdownOpen && (
//                 <div className="dropdown-menu show position-absolute" style={{ right: 0 }}>
//                     {notifications.length === 0 && (
//                         <span className="dropdown-item">No new notifications</span>
//                     )}
//                     {notifications.map((notif, index) => (
//                         <span key={index} className="dropdown-item">
//                             New booking for <b>{notif.listingTitle}</b> by <b>{notif.buyerUsername}</b>
//                         </span>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Notifications;


import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const socket = io('http://localhost:8080', {
            auth: {
                token: token,
            },
        });

        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        // Booking notification
        socket.on('newBooking', (data) => {
            setNotifications(prev => [data, ...prev]);
        });

        // Listing notifications
        socket.on('listingNotification', (data) => {
            setNotifications(prev => [data, ...prev]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="notifications position-relative ms-3">
            <button type="button" className="btn btn-primary" onClick={toggleDropdown}>
                Notifications <span className="badge bg-secondary">{notifications.length}</span>
            </button>
            {isDropdownOpen && (
                <div className="dropdown-menu show position-absolute" style={{ right: 0 }}>
                    {notifications.length === 0 && (
                        <span className="dropdown-item">No new notifications</span>
                    )}
                    {notifications.map((notif, index) => (
                        <span key={index} className="dropdown-item">
                            {notif.message}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
