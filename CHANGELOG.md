# CHANGELOG

## [1.0.0] – Final Release – May 11, 2025

### Major Features

- Complete full-stack MERN application deployment
- Patent search powered by NASA TechTransfer API
- Secure user registration and login with validation
- Patent stash system for preview and save functionality
- MongoDB-based profile with editable notes, tags, and links
- Vertical carousel for patent browsing
- Tag-based filtering in user profile
- Full UI/UX polish using Material UI and Framer Motion

---

## Timeline of Key Merges

### April 18–24: Project Setup and Early Frontend
- **`Folders show up`**, **`Deleted starting code`**, **`Danton`**: Initial project setup and clean slate commits *(Danton)*
- **`navbar updates`**: Navbar component and navigation structure *(Hung)*
- **`finished modals`**: Patent modal implementation started *(Danton)*
- **`profile draft`**: Draft of profile page and layout *(Danton)*

### April 26–29: Core UI Components and Pages
- **`Complete front end for Patent view`**: Vertical carousel and dynamic UI for browsing *(Danton)*
- **`final navbar changes`**: Navbar polish and dropdowns *(Hung)*
- **`notes`**: Note-taking structure and modal wiring *(Danton)*
- **`signup/login page design`**: Complete UI for login and signup *(Hung)*

### May 2–4: Connecting Frontend to Backend
- **`UI changes and connect front end`**: Began frontend-backend integration *(Danton)*
- **`ui changes and added stash`**: Added stash functionality with local state *(Danton)*
- **`mini-assignment2 done`**: Submission artifact *(Hung)*
- **`signin page created`**: Component refinement *(Hung)*

### May 5–6: Backend Logic Implementation
- **`started backend implementation`**: Initial setup of Express and MongoDB routes *(Danton)*
- **`Finished backend logic`**: Major routes for patents/accounts finished *(Danton)*
- **`finished delete route`**: Completed DELETE patent route *(Danton)*
- **`Signin parameters finished`**: Login validation logic *(Hung)*
- **`Navbar closes on hover`**: UX improvements for menu behavior *(Hung)*
- **`Login/Signup Logic`**: Auth error handling and redirects *(Hung)*

### May 7–8: Final Functionality and Data Handling
- **`Login functionality + preset search`**: Finalized session setup and preset patent categories *(Hung)*
- **`DONE!`**: Final frontend polish and conditional rendering *(Danton)*
- **`backend upgrades`**: Improved DB queries and object shaping *(Danton)*

### May 10: Final Polish
- **`fixed comments`**, **`added Danton comments`**: Cleaned up inline code comments *(Hung, Danton)*
- **`fixed bug on sign in page`**, **`not behind anymore`**: UI fixes and merge conflict resolutions *(Hung)*

---

## Summary of Contributions

### Danton Dang
- Led backend implementation (accounts, patents, full CRUD)
- Created profile, stash, view/edit notes pages
- Built vertical patent carousel and modal system
- Connected frontend and backend routes via fetch API

### Hung Doan
- Built and styled Navbar with dropdowns
- Designed and validated login/signup pages
- Added conditional rendering for auth-based components
- Debugged session state and improved UI responsiveness

---

## Closed Issues

- #3: Complete front end for Patent view  
- #4: Profile draft layout  
- #5: Notes feature implementation  
- #6: Connect front end with backend  
- #7: Implement stash system  
- #8: Create Signin page  
- #10: Implement backend logic  
- #11: Signin validation with parameters  
- #12: Finish delete patent route  
- #13: Navbar UI responsiveness  
- #15: Final login/preset search behavior  
- #16: Frontend state cleanup  
- #17: Backend efficiency and cleanup  
- #18: Add inline developer comments

---

## Notes

- This changelog integrates data from merge request logs, backend code, and technical documentation.
- All merges were reviewed and tested prior to final submission.
