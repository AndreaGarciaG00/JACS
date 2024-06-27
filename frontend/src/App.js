// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import store from './redux/store';
import AdminDashboard from './admin/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import CreatePost from './admin/CreatePost';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Layout from './admin/global/Layout';
import EditPost from './admin/EditPost';
import UserDashboard from './user/UserDashboard';
import SinglePost from './pages/SinglePost';
import Post from './pages/Post';
import PodcastDashboard from './admin/podcast/PodcastDashboard';
import CreatePodcast from './admin/podcast/CreatePodcast';
import EditPodcast from './admin/podcast/EditPodcast';
import EventDashboard from './admin/event/EventDashboard';
import CreateEvent from './admin/event/CreateEvent';
import EditEvent from './admin/event/EditEvent';
import EventPage from './pages/EventPage';

const AdminDashboardHOC = Layout(AdminDashboard);
const CreatePostHOC = Layout(CreatePost);
const EditPostHOC = Layout(EditPost);
const UserDashboardHOC = Layout(UserDashboard);

const App = () => {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <ProSidebarProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/register' element={<Register />} />
              <Route path='/post/:id' element={<SinglePost />} />
              <Route path='/post' element={<Post />} />
              <Route path='/eventos' element={<EventPage />} />
              <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
              <Route path='/admin/post/create' element={<AdminRoute><CreatePostHOC /></AdminRoute>} />
              <Route path='/admin/post/edit/:id' element={<AdminRoute><EditPostHOC /></AdminRoute>} />
              <Route path='/admin/event' element={<AdminRoute><EventDashboard /></AdminRoute>} />
              <Route path='/admin/event/create' element={<AdminRoute><CreateEvent /></AdminRoute>} />
              <Route path='/admin/event/edit/:id' element={<AdminRoute><EditEvent /></AdminRoute>} />
              <Route path='/admin/podcast' element={<AdminRoute><PodcastDashboard /></AdminRoute>} />
              <Route path='/admin/podcast/create' element={<AdminRoute><CreatePodcast /></AdminRoute>} />
              <Route path='/admin/podcast/edit/:id' element={<AdminRoute><EditPodcast /></AdminRoute>} />
              <Route path='/user/dashboard' element={<UserRoute><UserDashboardHOC /></UserRoute>} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
        </ProSidebarProvider>
      </Provider>
    </>
  );
}

export default App;
