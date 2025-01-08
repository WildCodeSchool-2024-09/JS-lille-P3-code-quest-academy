import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define challenge-related routes
import challengeActions from "./modules/challenge/challengeActions";

router.get("/api/challenges", challengeActions.browse);
router.get("/api/challenges/:id", challengeActions.read);

// Define account-related routes
import accountActions from "./modules/account/accountActions";

router.get("/api/account", accountActions.browse);
router.get("/api/account/:id", accountActions.read);

/* ************************************************************************* */

// Define progress-related routes
import progressActions from "./modules/progress/progressActions";

router.get("/api/progress", progressActions.browse);
router.get("/api/progress/:id", progressActions.read);

/* ************************************************************************* */

export default router;
