"use strict";
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
// https://sonarsource.github.io/rspec/#/rspec/S1186/javascript
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorateNoEmptyFunction = void 0;
const utils_1 = require("../../utils");
const no_empty_decorator_1 = require("./no-empty-decorator");
// core implementation of this rule does not provide quick fixes
function decorateNoEmptyFunction(rule) {
    rule.meta.hasSuggestions = true;
    return (0, utils_1.interceptReport)(rule, (context, reportDescriptor) => {
        const func = reportDescriptor.node;
        const name = reportDescriptor.data.name;
        const openingBrace = context.getSourceCode().getFirstToken(func.body);
        const closingBrace = context.getSourceCode().getLastToken(func.body);
        (0, no_empty_decorator_1.suggestEmptyBlockQuickFix)(context, reportDescriptor, name, openingBrace, closingBrace);
    });
}
exports.decorateNoEmptyFunction = decorateNoEmptyFunction;
//# sourceMappingURL=no-empty-function-decorator.js.map