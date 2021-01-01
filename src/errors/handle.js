"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const errorHandler = (error, request, response, next) => {
    /**
     * error: são os erros;
     * request: são os dados da minha requisição;
     * response: e a resposta que vc quer devolver;
     */
    // estou verificando se o error e uma instacia da classe ValidationError.
    // Os erros de validação vai ser retornado para quem estiver consumindo minha API.
    if (error instanceof yup_1.ValidationError) {
        let errors = {};
        // error.inner e onde os erros de validação vão estar.
        error.inner.forEach(err => {
            errors[err.path] = err.errors;
            /**
             * O retorno vai ser dessa forma:
                {
                  "message": "Validate fails",
                  "errors": {
                    "name": [
                      "name is a required field"
                    ],
                    "longitude": [
                      "longitude is a required field"
                    ]
                  }
                }
             */
        });
        return response.status(400).json({ message: 'Validate fails', errors });
    }
    console.error(error);
    // esse console retornando o erro, so vai aparece para nos.
    // eu vou devolver essa resposta para quem estiver consumindo minha api;
    return response.status(500).json({ message: 'Internal server error' });
};
exports.default = errorHandler;
//# sourceMappingURL=handle.js.map