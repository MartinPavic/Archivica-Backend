FROM node:14

# This will be working directory
WORKDIR /app

COPY . .
RUN npm i -g npm && npm i

# This cwil copy current directory into working directory
# You can specify only one file, like COPY package.json ./
COPY ./ ./

## Launch the wait tool and then your application
CMD ["npm", "run", "start"]
EXPOSE 4000
