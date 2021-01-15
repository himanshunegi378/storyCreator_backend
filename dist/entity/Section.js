"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Book_1 = require("./Book");
var Fragment_1 = require("./Fragment");
var Section = /** @class */ (function () {
    function Section() {
    }
    Section_1 = Section;
    var Section_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Section.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], Section.prototype, "lock", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return Section_1; }),
        typeorm_1.JoinColumn({ name: "previousSectionId" }),
        __metadata("design:type", Section)
    ], Section.prototype, "previousSection", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return Section_1; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Section)
    ], Section.prototype, "nextSection", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Fragment_1.Fragment; }, function (Fragment) { return Fragment.section; }),
        __metadata("design:type", Array)
    ], Section.prototype, "fragments", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Book_1.Book; }, function (book) { return book.sections; }),
        typeorm_1.JoinColumn({ name: "bookId" }),
        __metadata("design:type", Book_1.Book)
    ], Section.prototype, "book", void 0);
    Section = Section_1 = __decorate([
        typeorm_1.Entity()
    ], Section);
    return Section;
}());
exports.Section = Section;
