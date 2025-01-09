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

router.get("/api/accounts", accountActions.browse);
router.get("/api/accounts/:id", accountActions.read);
router.put("/api/accounts/:id", accountActions.edit);
router.post("/api/accounts", accountActions.add);
router.delete("/api/accounts/:id", accountActions.destroy);

/* ************************************************************************* */

// Define progress-related routes
import progressActions from "./modules/progress/progressActions";

router.get("/api/progress", progressActions.browse);
router.get("/api/progress/:id", progressActions.read);

/* ************************************************************************* */

export default router;
