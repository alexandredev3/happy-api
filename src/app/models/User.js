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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Orphanage_1 = __importDefault(require("./Orphanage"));
const ResetPassword_1 = __importDefault(require("./ResetPassword"));
let User = class User {
    async encryptPassword() {
        if (this.password_hash) {
            this.password_hash = await bcryptjs_1.default.hash(this.password_hash, 8);
        }
    }
    comparePassword(password) {
        return bcryptjs_1.default.compare(password, this.password_hash);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "password_hash", void 0);
__decorate([
    typeorm_1.OneToMany(() => Orphanage_1.default, orphanage => orphanage.users, {
        cascade: ['insert', 'update'],
    }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", Array)
], User.prototype, "orphanages", void 0);
__decorate([
    typeorm_1.OneToOne(() => ResetPassword_1.default, reset_password => reset_password.user, {
        cascade: ['insert', 'update']
    }),
    __metadata("design:type", ResetPassword_1.default)
], User.prototype, "reset_password", void 0);
__decorate([
    typeorm_1.Column('boolean', {
        default: false
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "encryptPassword", null);
User = __decorate([
    typeorm_1.Entity('users')
], User);
exports.default = User;
//# sourceMappingURL=User.js.map