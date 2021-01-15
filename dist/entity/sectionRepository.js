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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var bookRepository_1 = require("./bookRepository");
var fragmentRepository_1 = require("./fragmentRepository");
var Section_1 = require("./Section");
var SectionRepository = /** @class */ (function (_super) {
    __extends(SectionRepository, _super);
    function SectionRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SectionRepository.prototype.createSection = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var book, lastSectionAddedInBook, fragmentCountInLastSection, newSection, savedsection, newSection, savedsection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.manager
                            .getCustomRepository(bookRepository_1.BookRespository)
                            .getbook(bookId)];
                    case 1:
                        book = _a.sent();
                        if (!book)
                            return [2 /*return*/, { msg: "Book not found" }];
                        return [4 /*yield*/, this.LastSectionAddedInBook(book.id)];
                    case 2:
                        lastSectionAddedInBook = _a.sent();
                        if (!lastSectionAddedInBook) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.manager
                                .getCustomRepository(fragmentRepository_1.FragmentRepository)
                                .countFragmentsInSection(lastSectionAddedInBook.id)];
                    case 3:
                        fragmentCountInLastSection = _a.sent();
                        if (!(fragmentCountInLastSection > 0)) return [3 /*break*/, 6];
                        newSection = this.manager.create(Section_1.Section, {
                            book: book,
                            previousSection: lastSectionAddedInBook,
                        });
                        return [4 /*yield*/, this.manager.save(newSection)];
                    case 4:
                        savedsection = _a.sent();
                        lastSectionAddedInBook.nextSection = savedsection;
                        return [4 /*yield*/, this.manager.save(lastSectionAddedInBook)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, savedsection];
                    case 6: return [2 /*return*/, { msg: "previous section is empty" }];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        newSection = this.manager.create(Section_1.Section, {
                            book: book,
                        });
                        return [4 /*yield*/, this.manager.save(newSection)];
                    case 9:
                        savedsection = _a.sent();
                        return [2 /*return*/, savedsection];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    SectionRepository.prototype.doesSectionContainFragments = function (sectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var fragments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.manager
                            .getCustomRepository(fragmentRepository_1.FragmentRepository)
                            .getAllFragmentsInSection(sectionId)];
                    case 1:
                        fragments = _a.sent();
                        return [2 /*return*/, fragments];
                }
            });
        });
    };
    SectionRepository.prototype.lockSection = function (sectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedSection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.manager
                            .createQueryBuilder(Section_1.Section, "section")
                            .update(Section_1.Section, { lock: true })
                            .where("section.id = :id", { id: sectionId })
                            .execute()];
                    case 1:
                        updatedSection = _a.sent();
                        return [2 /*return*/, updatedSection.affected === 1];
                }
            });
        });
    };
    SectionRepository.prototype.LastSectionAddedInBook = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var lastSectionAddedInBook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.manager
                            .createQueryBuilder()
                            .select("section")
                            .from(Section_1.Section, "section")
                            .where("section.bookId = :id", { id: bookId })
                            .orderBy("section.id", "DESC")
                            .leftJoinAndSelect("section.previousSection", "previousSection")
                            .leftJoinAndSelect("section.nextSection", "nextSection")
                            .leftJoinAndSelect("section.book", "book")
                            .getOne()];
                    case 1:
                        lastSectionAddedInBook = _a.sent();
                        if (!lastSectionAddedInBook)
                            return [2 /*return*/, undefined];
                        return [2 /*return*/, lastSectionAddedInBook];
                }
            });
        });
    };
    SectionRepository.prototype.getAllSectionsInbook = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var sections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.manager.find(Section_1.Section, {
                            where: { book: bookId },
                            relations: ["previousSection", "nextSection"],
                        })];
                    case 1:
                        sections = _a.sent();
                        return [2 /*return*/, sections];
                }
            });
        });
    };
    SectionRepository = __decorate([
        typeorm_1.EntityRepository()
    ], SectionRepository);
    return SectionRepository;
}(typeorm_1.AbstractRepository));
exports.SectionRepository = SectionRepository;
