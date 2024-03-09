const isLetter = (char) => /^[a-zA-Z]+$/.test(char);
function snakeCase(string) {
  const chars = string.split('');
  let newChars = [];
  for (let i = 0; i < chars.length; i += 1) {
    let char = chars[i];

    if (i !== 0 && char === char.toUpperCase() && isLetter(char)) {
      newChars.push('_', char.toLowerCase());
    } else {
      newChars.push(char);
    }
  }

  return newChars.join('');
}

function camelCase(string) {
  const chars = string.split('');
  let newChars = [];
  for (let i = 0; i < chars.length; i += 1) {
    let char = chars[i];

    if (char === '_') {
      i += 1;
      let nextChar = chars[i];
      newChars.push(nextChar.toUpperCase());
    } else {
      newChars.push(char);
    }
  }

  return newChars.join('');
}

function deep(object, callBack) {
  // console.log('dee called');
  if (object == null) {
    return object;
  }
  if (typeof object === 'number' || typeof object === 'boolean' || typeof object === 'string') {
    return object;
  }
  if (Array.isArray(object)) {
    return object.map((item) => {
      return deep(item, callBack);
    });
  }

  if (typeof object === 'object') {
    Object.keys(object).forEach((key) => {
      // basically two approaches: 1) mutate the original object, 2) return copy
      const value = object[key];
      delete object[key];
      object[callBack(key)] = deep(value, callBack);
    });

    return object;
  }
}

function deepCamelize(object) {
  return deep(object, camelCase);
}
function deepSnakeCase(object) {
  return deep(object, snakeCase);
}

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
// we have to create objects
const object = {};
function createObject(entries, nestedLevel, keyLength, obj = object) {
  if (nestedLevel === 0) {
    return;
  }
  for (let i = 0; i < entries; i += 1) {
    const types = ['string', 'number', 'array', 'boolean', 'object'];
    const typesIndex = Math.round(Math.random() * types.length);
    const selectedType = types[typesIndex];

    if (selectedType === 'string') {
      obj[makeid(keyLength)] = 'string';
    }
    if (selectedType === 'number') {
      obj[makeid(keyLength)] = 1;
    }
    if (selectedType === 'boolean') {
      obj[makeid(keyLength)] = true;
    }
    if (selectedType === 'array') {
      const key = makeid(keyLength);
      obj[key] = [];

      obj[key] = [createObject(entries, nestedLevel - 1, keyLength, obj[key])];
    }
    if (selectedType === 'object') {
      const key = makeid(keyLength);
      obj[key] = {};
      obj[key] = { [makeid(keyLength)]: createObject(entries, nestedLevel - 1, keyLength, obj[key]) };
    }
  }

  return obj;
}

function createObjects(number, entries, nestedLevel, keyLength) {
  const arr = [];
  for (let i = 0; i < number; i += 1) {
    const obj = {};
    createObject(entries, nestedLevel, keyLength, obj);

    arr.push(obj);
  }

  return arr;
}

function benchmark(number, callBack, title, objects) {
  const now = performance.now();

  for (let i = 0; i < objects.length; i += 1) {
    callBack(objects[i]);
  }
  const newNow = performance.now();
  const timeElapsed = newNow - now;
  console.log(`${title} took ${timeElapsed} ms, for ${number} objects`);
}

function benchmarkFunctions(number, objects) {
  console.log('Benchmarking deepCamelize:');
  benchmark(number, deepCamelize, 'deepCamelize', objects);
  console.log('Benchmarking deeSnakeCase:');
  benchmark(number, deepSnakeCase, 'deepSnakeCase', objects);
}

[100, 1000, 10000, 100000].forEach((times) => {
  const objects = createObjects(times, 10, 2, 7);
  console.log('-------------------------');
  console.log(`Benchmarking starting for ${times} objects`);
  benchmarkFunctions(times, objects);
});
