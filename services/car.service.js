import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PAGE_SIZE = 5
const CAR_KEY = 'carDB'

var gFilterBy = { txt: '', minSpeed: 0 }
var gSortBy = { vendor: 1 }
var gPageIdx

_createCars()

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getNextCarId,
    getFilterBy,
    setFilterBy,
    getCarCountBySpeedMap,
}
window.carService = carService

function query() {
    return storageService.query(CAR_KEY).then(cars => {
        if (gFilterBy.txt) {
            const regex = new RegExp(gFilterBy.txt, 'i')
            cars = cars.filter(car => regex.test(car.vendor))
        }
        if (gFilterBy.minSpeed) {
            cars = cars.filter(car => car.maxSpeed >= gFilterBy.minSpeed)
        }
        if (gPageIdx !== undefined) {
            const startIdx = gPageIdx * PAGE_SIZE
            cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
        }
        if (gSortBy.maxSpeed !== undefined) {
            cars.sort(
                (c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed
            )
        } else if (gSortBy.vendor !== undefined) {
            cars.sort(
                (c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor
            )
        }

        return cars
    })
}

function get(carId) {
    return storageService.get(CAR_KEY, carId)
        .then(car => _setNextPrevCarId(car))
}

function _setNextPrevCarId(car) {
    return storageService.query(CAR_KEY)
        .then(cars => {
            const carIdx = cars.findIndex(currCar => currCar.id === car.id)
            car.nextCarId = cars[carIdx + 1] ? cars[carIdx + 1].id : cars[0].id
            car.prevCarId = cars[carIdx - 1]
                ? cars[carIdx - 1].id
                : cars[cars.length - 1].id
            return car
        })
}

function remove(carId) {
    return storageService.remove(CAR_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(CAR_KEY, car)
    } else {
        return storageService.post(CAR_KEY, car)
    }
}

function getEmptyCar(vendor = '', maxSpeed = 0) {
    return { id: '', vendor, maxSpeed }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextCarId(carId) {
    return storageService.query(CAR_KEY).then(cars => {
        var idx = cars.findIndex(car => car.id === carId)
        if (idx === cars.length - 1) idx = -1
        return cars[idx + 1].id
    })
}

function getCarCountBySpeedMap() {
    return storageService.query(CAR_KEY).then(cars => {
        const carCountBySpeedMap = cars.reduce(
            (map, car) => {
                if (car.maxSpeed < 120) map.slow++
                else if (car.maxSpeed < 200) map.normal++
                else map.fast++
                return map
            },
            { slow: 0, normal: 0, fast: 0 }
        )
        return carCountBySpeedMap
    })
}

function _createCars() {
    let cars = utilService.loadFromStorage(CAR_KEY)
    if (!cars || !cars.length) {
        cars = []
        cars.push(_createCar('audu', 300))
        cars.push(_createCar('fiak', 120))
        cars.push(_createCar('subali', 100))
        cars.push(_createCar('mitsu', 150))
        utilService.saveToStorage(CAR_KEY, cars)
    }
}

function _createCar(vendor, maxSpeed = 250) {
    const car = getEmptyCar(vendor, maxSpeed)
    car.id = utilService.makeId()
    return car
}
