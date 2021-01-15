"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var databseImpl_1 = __importDefault(require("../databseImpl"));
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require("./credentials.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
var FirestoreDatabase = /** @class */ (function (_super) {
    __extends(FirestoreDatabase, _super);
    function FirestoreDatabase() {
        var _this = _super.call(this) || this;
        var db = firebase_admin_1.default.firestore();
        _this.bookCollectionRef = db.collection("books");
        _this.sectionCollectionRef = db.collection("sections");
        _this.fragmentCollectionRef = db.collection("fragments");
        return _this;
    }
    FirestoreDatabase.prototype.addBook = function (bookName) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookCollectionRef.doc().set({
                            name: bookName,
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result ? true : false];
                }
            });
        });
    };
    FirestoreDatabase.prototype.getAllBooks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var snapshot, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookCollectionRef.get()];
                    case 1:
                        snapshot = _a.sent();
                        data = [];
                        snapshot.forEach(function (doc) {
                            data.push({ id: doc.id, name: doc.data().name });
                        });
                        return [2 /*return*/, data];
                }
            });
        });
    };
    FirestoreDatabase.prototype.addSection = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sectionCollectionRef.doc().set({
                            lock: false,
                            bookId: bookId,
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result ? true : false];
                }
            });
        });
    };
    FirestoreDatabase.prototype.getAllSectionsInBook = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var allSectionsRef, allSections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sectionCollectionRef
                            .where("bookId", "==", bookId)
                            .get()];
                    case 1:
                        allSectionsRef = _a.sent();
                        allSections = [];
                        allSectionsRef.forEach(function (doc) {
                            allSections.push({ id: doc.id, lock: doc.data().lock });
                        });
                        return [2 /*return*/, allSections];
                }
            });
        });
    };
    FirestoreDatabase.prototype.lockSection = function (sectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sectionCollectionRef
                            .doc(sectionId)
                            .set({ lock: true }, { merge: true })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result ? true : false];
                }
            });
        });
    };
    FirestoreDatabase.prototype.addFragment = function (sectionId, text) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fragmentCollectionRef
                            .doc()
                            .set({ sectionId: sectionId, text: text, like: 0 })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result ? true : false];
                }
            });
        });
    };
    FirestoreDatabase.prototype.getAllFragmentsInSection = function (sectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var allSectionsRef, allFragments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fragmentCollectionRef
                            .where("sectionId", "==", sectionId)
                            .get()];
                    case 1:
                        allSectionsRef = _a.sent();
                        allFragments = [];
                        allSectionsRef.forEach(function (doc) {
                            var _a = doc.data(), text = _a.text, like = _a.like;
                            allFragments.push({ id: doc.id, text: text, like: like });
                        });
                        return [2 /*return*/, allFragments];
                }
            });
        });
    };
    FirestoreDatabase.prototype.likeFragment = function (fragmentId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fragmentCollectionRef
                            .doc(fragmentId)
                            .update({ like: firebase_admin_1.default.firestore.FieldValue.increment(1) })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result ? true : false];
                }
            });
        });
    };
    return FirestoreDatabase;
}(databseImpl_1.default));
exports.FirestoreDatabase = FirestoreDatabase;
