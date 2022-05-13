"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalRuleDecorators = void 0;
/*
 * SonarQube JavaScript Plugin
 * Copyright (C) 2011-2022 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
const accessor_pairs_decorator_1 = require("./accessor-pairs-decorator");
const no_dupe_keys_decorator_1 = require("./no-dupe-keys-decorator");
const no_duplicate_imports_decorator_1 = require("./no-duplicate-imports-decorator");
const no_empty_decorator_1 = require("./no-empty-decorator");
const no_empty_function_decorator_1 = require("./no-empty-function-decorator");
const no_redeclare_decorator_1 = require("./no-redeclare-decorator");
const no_throw_literal_decorator_1 = require("./no-throw-literal-decorator");
const no_unreachable_decorator_1 = require("./no-unreachable-decorator");
const object_shorthand_decorator_1 = require("./object-shorthand-decorator");
const prefer_for_of_decorator_1 = require("./prefer-for-of-decorator");
const prefer_template_decorator_1 = require("./prefer-template-decorator");
const use_isnan_decorator_1 = require("./use-isnan-decorator");
exports.externalRuleDecorators = [
    { decorate: accessor_pairs_decorator_1.decorateAccessorPairs, ruleKey: 'accessor-pairs' },
    { decorate: no_dupe_keys_decorator_1.decorateNoDupeKeys, ruleKey: 'no-dupe-keys' },
    { decorate: no_duplicate_imports_decorator_1.decorateNoDuplicateImports, ruleKey: 'no-duplicate-imports' },
    { decorate: no_empty_decorator_1.decorateNoEmpty, ruleKey: 'no-empty' },
    { decorate: no_empty_function_decorator_1.decorateNoEmptyFunction, ruleKey: 'no-empty-function' },
    { decorate: no_redeclare_decorator_1.decorateNoRedeclare, ruleKey: 'no-redeclare' },
    { decorate: no_throw_literal_decorator_1.decorateNoThrowLiteral, ruleKey: 'no-throw-literal' },
    { decorate: no_unreachable_decorator_1.decorateNoUnreachable, ruleKey: 'no-unreachable' },
    { decorate: object_shorthand_decorator_1.decorateObjectShorthand, ruleKey: 'object-shorthand' },
    { decorate: prefer_for_of_decorator_1.decoratePreferForOf, ruleKey: 'prefer-for-of' },
    { decorate: prefer_template_decorator_1.decoratePreferTemplate, ruleKey: 'prefer-template' },
    { decorate: use_isnan_decorator_1.decorateUseIsNan, ruleKey: 'use-isnan' },
];
//# sourceMappingURL=index.js.map