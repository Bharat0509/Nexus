const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const coreAuthMiddleware = require('../middlewares/coreAuthMiddleware.js');
const { logRequest, validateEventData } = require('../middleware.js');
const { 
  getAllForms, 
  createForm, 
  submitResponse, 
  getResponses, 
  getFormFields, 
  getPublicForms,
  updateFormStatus,
  updateFormDeadline,
  notifyAllSubscribers,
  temp,
  getLeaderboard,
  updateForm,  // Add this
  getAdminLeaderboard,
  submitOpenResponse // Add this
} = require('../controllers/formController.js');

const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Routes
router.get('/', getPublicForms);
router.get('/all', coreAuthMiddleware, getAllForms);
router.post('/create', coreAuthMiddleware, createForm);
router.post('/submit/:id', authMiddleware, upload.single('file'), submitResponse);
router.post('/submit/open/:id', upload.single('file'), submitOpenResponse);
router.get('/get-responses/:id', coreAuthMiddleware, getResponses);
// Add new route for leaderboard
router.get('/reference/leaderboard/', getLeaderboard);
// Add new route for admin leaderboard
router.get('/reference/admin-leaderboard/', coreAuthMiddleware, getAdminLeaderboard);
router.get('/:id', getFormFields);

// New route for updating form status
router.patch('/update-status/:id', coreAuthMiddleware, updateFormStatus);

// Route to update form deadline
router.patch('/update-deadline/:id', coreAuthMiddleware,updateFormDeadline);

// New route for updating forms
router.put('/update/:id', coreAuthMiddleware, updateForm);

//Route to notify subscribers
router.post('/notify-subscribers/:formId', coreAuthMiddleware,notifyAllSubscribers);

// router.post('/notify-subscribers/:formId', coreAuthMiddleware, async (req, res) => {
//   const { formId } = req.params;

//   try {
//       await notifyAllSubscribers(formId);
//       res.status(200).json({ message: 'Subscribers notified successfully.' });
//   } catch (error) {
//       console.error(`Error notifying subscribers: ${error.message}`);
//       res.status(500).json({ message: 'Error notifying subscribers.' });
//   }
// });

// router.get('/test/:id', temp);

module.exports = router;
