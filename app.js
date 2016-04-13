var kue = require('kue')
var jobs = kue.createQueue({
  redis: 'redis://127.0.0.1:6379'
});
var facebook = require('./facebook.js')
var slideshow = require('./slideshow.js')

var timesMap = {
  "LCD-Soundsystem_Dance-Yourself-Clean.mp4": [616, 461, 133, 329, 133, 166, 296, 164, 132, 330, 298, 461, 167, 295, 298, 300, 161, 167, 296, 297, 461, 165, 297, 298, 166, 296, 164, 298, 164, 132, 165, 298, 166, 295, 165, 165, 132, 165, 132, 165, 298, 330, 595, 328, 133, 165, 133, 163, 165, 133, 329, 132, 165, 596, 328, 132, 165, 297, 165, 167, 295, 297, 462, 165, 297, 299, 295, 166, 164, 297, 297, 463, 164, 297, 297, 165, 297, 167, 296, 164, 132, 463, 164, 297, 167, 164, 131, 164, 166, 131, 298, 33, 296, 597, 460, 164, 298, 165, 133, 330, 132, 32, 132, 597, 328, 133, 163, 296, 165, 166, 297, 296, 463, 165, 296, 297, 463, 166, 295, 297, 462, 166, 231, 66, 298, 165, 296, 164, 298, 330, 596, 199, 260, 166, 132, 164, 133, 169, 293, 164, 165, 599, 459, 165, 295, 132, 165, 297, 34, 297, 594, 33, 296, 298, 296, 167, 165, 295, 298, 461, 165, 299, 297, 460, 165, 297, 298, 461, 166, 296, 462, 299, 164, 296, 165, 165, 597, 462, 758, 460, 167, 594, 461, 168, 294, 166, 133, 330, 295, 626, 597, 459, 165, 297, 301, 457, 166, 297, 297, 165, 298, 168, 293, 330, 429, 169, 292, 233, 230, 462, 198, 99, 34, 298, 592, 462, 165, 298, 165, 132, 628, 596, 624, 296, 329, 297, 300, 628, 294, 297, 462, 165, 296, 165, 132, 462, 166, 297, 298, 163, 298, 167, 294, 332, 427, 165, 297, 165, 165, 132, 168, 129, 165, 598, 29, 598, 626, 294, 132, 165, 330, 134, 165, 595, 329, 31, 264, 299, 163, 134, 31, 299, 296, 627, 298, 229, 33, 34, 263, 198, 99, 66, 298, 296, 462, 167, 262, 333, 295, 166, 98, 65, 297, 366, 564, 295, 326, 132, 264, 200, 296, 332, 593, 460, 165, 299, 296, 329, 132, 165, 462, 167, 296, 131, 98, 67, 462, 165, 298, 296, 462, 164, 297, 298, 463, 163, 297, 297, 465, 164, 594, 163, 298, 164, 299, 762, 160, 330, 132, 167, 462, 130, 331, 296, 598, 326, 132, 167, 299, 162, 164, 299, 297, 461, 165, 297, 297, 298, 164, 164, 297, 132, 166, 463, 164, 296, 297, 462, 165, 299, 297, 626, 296, 165, 167, 131, 297, 165, 296, 34, 296, 595, 461, 165, 132, 165, 165, 132, 298, 165, 164, 596, 328, 132, 167, 296, 165, 164, 599, 458, 168, 293, 297, 165, 297, 165, 298, 296, 462, 168, 294, 299, 460, 165, 297, 165, 165, 595, 295, 331, 132, 165, 297, 134, 162, 166, 100, 395, 164, 100, 462, 133, 264, 66, 163, 133, 430, 196, 599, 328, 295, 296, 165, 166, 296, 297, 464, 163, 297, 299, 165, 163, 133, 164, 396, 133, 65, 132, 200, 131, 132, 329, 331, 131, 297, 133, 33, 164, 134, 131, 167, 98, 527, 298, 328, 134, 164, 296, 297, 330, 595, 329, 132, 166, 296, 165, 134, 264, 66, 295, 596, 329, 299, 294, 165, 166, 297, 296, 628, 296, 198, 33, 66, 462, 166, 297, 296, 462, 165, 298, 296, 165, 462, 297, 330, 597, 298, 161, 166, 296, 166, 132, 297, 32, 132, 165, 597, 328, 131, 165, 298, 98, 198, 34, 296, 132, 165, 630, 295, 296, 198, 264, 168, 295, 296, 462, 168, 299, 293, 165, 297, 164, 297, 763, 160, 759, 464, 296, 928, 459, 164, 462, 131, 331, 131, 166, 597, 326, 132, 166, 298, 330, 265, 327, 463, 164, 298, 300, 459, 164, 298, 299, 459, 166, 597, 460, 164, 296, 925, 299, 164, 164, 131, 330, 132, 330, 299, 594, 328, 137, 161, 595, 328, 297, 596, 330, 296, 299, 162, 166, 296, 299, 460, 165, 594, 464, 163, 297, 297, 462, 165, 298, 296, 165, 297, 165, 298, 32, 892, 1224, 294, 333, 591, 627, 300, 160, 133, 330, 300, 627, 592, 461, 166, 298, 294, 631, 593, 460, 164, 297, 763, 162, 597, 464, 159, 297, 927, 1222, 161, 167, 133, 163, 165, 133, 165, 163, 132, 165, 133, 33, 131, 166, 134, 165, 97, 65, 166, 131, 165, 132, 166, 131, 33, 133, 166, 168, 127, 167, 130, 165, 132, 33, 132, 165, 165, 133, 300, 161, 166, 263, 198, 132, 165, 132, 34, 132, 164, 597, 299, 29, 131, 165, 166, 134, 164, 132, 32, 131, 167, 295, 165, 430, 33, 132, 165, 297, 164, 66, 66, 166, 164, 132, 166, 165, 132, 630, 293, 165, 132, 33, 134, 295, 165, 133, 34, 131, 296, 34, 131, 297, 166, 167, 129, 165, 165, 132, 330, 132, 165, 132, 33, 298, 597, 326, 132, 165, 133, 165, 165, 131, 165, 165, 297, 132, 33, 132, 165, 133, 164, 165, 297, 165, 132, 165, 165, 132, 166, 297, 164, 132, 165, 165, 296, 166, 132, 166, 131, 167, 163, 133, 165, 165, 132, 626, 298, 163, 132, 330, 265, 197, 133, 298, 33, 131, 165, 164, 133, 164, 133, 33, 132, 165, 133, 165, 165, 130, 166, 132, 32, 132, 165, 133, 330, 133, 630, 161, 131, 166, 131, 165, 167, 133, 167, 128, 33, 132, 164, 132, 35, 130, 165, 132, 166, 167, 129, 166, 164, 132, 165, 165, 133, 629, 131, 132, 33, 165, 130, 331, 131, 165, 299, 164, 133, 164, 164, 297, 165, 132, 165, 133, 33, 133, 300, 160, 165, 132, 166, 164, 132, 431, 328, 330, 298, 164, 132, 166, 132, 330, 131, 34, 296, 132, 330, 133, 165, 133, 163, 166, 131, 33, 132, 165, 133, 164, 596, 31, 136, 161, 133, 165, 165, 131, 165, 165, 133, 101, 65, 297, 163, 297, 165, 297, 165, 133, 165, 132, 33, 132, 164, 165, 132, 33, 132, 132, 34, 131, 165, 430, 164, 330, 297, 132, 165, 166, 132, 330, 131, 330, 132, 297, 33, 132, 167, 131, 165, 165, 131, 165, 165, 132, 165, 597, 162, 165, 132, 165, 164, 133, 165, 165, 133, 164, 296, 165, 132, 166, 165, 132, 164, 166, 133, 165, 131, 165, 165, 131, 166, 165, 132, 462, 461, 300, 162, 298, 165, 461, 133, 631, 161, 298, 130, 35, 593, 164, 462, 599, 627, 293, 164, 134, 167, 162, 296, 300, 294, 264, 363, 595, 32, 598, 626, 130, 164, 297, 631, 294, 296, 165, 462, 465, 131, 629, 298, 160, 165, 429, 332, 460, 462, 133, 165, 297, 164, 463, 131, 165, 464, 133, 327, 132, 165, 165, 132, 331, 132, 296, 330, 598, 162, 133, 31, 132, 166, 165, 131, 165, 132, 165, 165, 298, 166, 131, 165, 296, 165, 132, 33, 132, 297, 630, 162, 132, 165, 135, 162, 165, 132, 165, 166, 132, 163, 133, 33, 132, 165, 165, 132, 298, 32, 134, 163, 132, 165, 165, 134, 167, 128, 32, 133, 165, 595, 164, 165, 297, 297, 299, 164, 165, 295, 165, 132, 166, 131, 33, 133, 167, 297, 162, 133, 166, 164, 132, 165, 164, 133, 166, 428, 32, 133, 165, 165, 132, 329, 133, 164, 136, 162, 297, 164, 99, 67, 132, 164, 165, 135, 166, 129, 34, 131, 296, 33, 132, 166, 131, 165, 166, 133, 460, 134, 163, 34, 131, 133, 34, 463, 131, 164, 131, 34, 132, 164, 132, 34, 131, 165, 132, 166, 167, 130, 131, 34, 164, 132, 165, 132, 33, 132, 165, 298, 165, 428, 165, 132, 33, 169, 95, 34, 164, 132, 333, 129, 166, 164, 132, 165, 297, 165, 299, 164, 132, 164, 165, 132, 165, 133, 32, 132, 166, 166, 130, 299, 163, 297, 33, 132, 165, 132, 333, 132, 162, 132, 331, 131, 330, 132, 165, 166, 132, 164, 132, 165, 165, 132, 165, 165, 133, 167, 131, 33, 427, 33, 429, 165, 165, 133, 163, 297, 166, 297, 165, 132, 164, 166, 133, 165, 296, 164, 133, 329, 133, 33, 132, 298, 164, 762, 294, 628, 461, 137, 624, 629, 293, 164, 132, 466, 166, 457, 134, 631, 293, 298, 628, 294, 164, 167, 596, 294, 332, 592, 461, 297, 166, 296, 166, 461, 462, 136, 161, 466, 592, 629, 163, 131, 166, 164, 432, 326, 466, 461, 132, 459, 165, 463, 133, 627, 163, 298, 131, 165, 166, 133, 328, 763, 293, 301, 164, 165, 295, 164, 297, 132, 165, 168, 295, 164, 132, 165, 297, 165, 165, 133, 296, 165, 297, 165, 165, 132, 330, 134, 461, 165, 296, 165, 297, 165, 133, 163, 167, 296, 132, 330, 132, 165, 167, 131, 165, 165, 131, 463, 461, 462, 164, 599, 161, 298, 134, 30, 464, 129, 463, 164, 133, 33, 134, 163, 131, 165, 165, 132, 166, 297, 297, 463, 165, 163, 132, 165, 133, 164, 166, 298, 165, 132, 296, 33, 132, 164, 165, 133, 165, 133, 328, 134, 163, 297, 297, 35, 296, 298, 165, 132, 163, 165, 133, 165, 164, 132, 166, 133, 164, 165, 132, 164, 165, 132, 165, 165, 134, 166, 295, 164, 297, 299, 163, 302, 160, 297, 166, 131, 165, 166, 131, 165, 168, 131, 164, 166, 130, 33, 132, 132, 34, 131, 297, 165, 166, 131, 330, 132, 298, 164, 297, 1223, 460, 169, 293, 299, 464, 161, 297, 299, 164, 297, 164, 297, 165, 165, 597, 459, 165, 132, 165, 165, 133, 330, 132, 164, 598, 460, 164, 296, 165, 165, 297, 297, 465, 161, 298, 296, 303, 160, 166, 297, 295, 463, 168, 294, 298, 165, 296, 164, 297, 297, 463, 165, 296, 330, 133, 330, 134, 296, 165, 163, 597, 464, 162, 130, 165, 165, 132, 594, 35, 595, 596, 325, 133, 33, 134, 329, 295, 462, 165, 299, 295, 462, 165, 199, 98, 298, 330, 198, 98, 297, 301, 459, 166, 594, 463, 166, 298, 325, 134, 164, 296, 330, 132, 166, 597, 458, 165, 297, 297, 331, 296, 599, 458, 166, 295, 165, 165, 165, 132, 299, 629, 595, 458, 165, 297, 296, 462, 165, 299, 464, 293, 165, 165, 132, 33, 131, 167, 299, 162, 135, 327, 132, 165, 165, 99, 33, 297, 166, 164, 297, 297, 330, 134, 164, 296, 297, 329, 133, 164, 598, 161, 165, 299, 164, 134, 329, 133, 163, 296, 463, 164, 298, 299, 295, 329, 297, 166, 131, 628, 133, 163, 297, 298, 34, 297, 297, 165, 131, 32, 297, 165, 132, 165, 132, 330, 133, 164, 297, 297, 165, 165, 297, 166, 132, 330, 131, 165, 297, 299, 164, 165, 131, 165, 297, 165, 166, 297, 300, 294, 164, 165, 132, 165, 298, 329, 762, 96, 33, 165, 132, 34, 131, 167, 131, 133, 32, 164, 132, 166, 164, 165, 132, 132, 34, 133, 165, 130, 166, 164, 297, 595, 32, 133, 166, 130, 34, 131, 165, 132, 165, 165, 132, 165, 166, 132, 164, 166, 131, 165, 297, 165, 132, 165, 297, 166, 164, 132, 297, 628, 165, 132, 164, 165, 264, 330, 165, 134, 164, 134, 30, 132, 165, 165, 132, 297, 165, 165, 133, 132, 197, 133, 163, 168, 129, 166, 164, 434, 161, 166, 131, 164, 165, 132, 165, 132, 34, 135, 162, 297, 296, 165, 165, 298, 296, 167, 133, 163, 166, 130, 165, 165, 133, 164, 297, 167, 297, 164, 131, 165, 165, 132, 166, 164, 133, 166, 135, 162, 462, 166, 130, 165, 165, 132, 167, 164, 130, 165, 134, 31, 132, 165, 495, 100, 297, 34, 131, 164, 462, 132, 165, 133, 33, 133, 164, 165, 131, 166, 131, 165, 165, 165, 132, 167, 131, 166, 164, 131, 166, 165, 136, 162, 429, 164, 165, 164, 133, 164, 297, 166, 131, 33, 134, 164, 132, 164, 165, 132, 165, 165, 132, 33, 132, 132, 33, 136, 162, 131, 165, 133, 32, 132, 165, 165, 132, 464, 460, 132, 34, 131, 166, 296, 165, 133, 33, 134, 164, 130, 330, 132, 165, 165, 298, 132, 164, 331, 135, 163, 295, 165, 298, 133, 164, 165, 296, 596, 31, 463, 132, 296, 330, 465, 129, 462, 166, 461, 132, 462, 165, 297, 297, 33, 598, 294, 300, 28, 298, 164, 133, 631, 593, 592, 32, 597, 163, 163, 297, 598, 459, 165, 165, 296, 165, 596, 461, 164, 297, 165, 133, 465, 294, 462, 461, 165, 463, 133, 460, 166, 296, 300, 31, 132, 461, 165, 165, 132, 297, 166, 297, 329, 297, 462, 132, 167, 164, 132, 165, 131, 33, 132, 166, 131, 33, 297, 133, 166, 163, 134, 164, 132, 34, 130, 165, 297, 165, 133, 164, 165, 297, 165, 99, 33, 166, 131, 165, 166, 297, 296, 165, 429, 34, 296, 165, 134, 163, 166, 131, 165, 165, 133, 164, 132, 33, 132, 463, 296, 330, 462, 133, 166, 130, 33, 297, 132, 165, 165, 132, 332, 130, 166, 131, 165, 166, 131, 34, 131, 165, 132, 165, 596, 162, 166, 133, 164, 165, 132, 164, 168, 131, 164, 296, 165, 133, 164, 166, 132, 165, 166, 131, 165, 165, 132, 165, 131, 166, 165, 132, 927, 1217, 464, 166, 295, 296, 464, 164, 297, 296, 166, 297, 167, 296, 296, 462, 165, 298, 296, 65, 264, 66, 232, 296, 66, 99, 496, 264, 395, 232, 299, 164, 133, 329, 131, 165, 1419, 428, 297, 299, 629, 293, 297, 463, 165, 297, 296, 462, 165, 298, 296, 165, 297, 165, 297, 331, 428, 165, 297, 165, 165, 132, 165, 297, 331, 131, 165, 599, 457, 166, 296, 165, 132, 330, 134, 165, 629, 293, 297, 297, 167, 131, 32, 297, 297, 628, 297, 296, 462, 165, 296, 300, 461, 164, 297, 297, 167, 296, 166, 296, 330, 595, 459, 165, 135, 327, 132, 331, 133, 166, 592, 329, 133, 164, 300, 164, 131, 329, 133, 164, 630, 592, 297, 164, 166, 296, 298, 461, 166, 296, 297, 165, 299, 165, 296, 296, 462, 168, 296, 329, 132, 164, 132, 165, 298, 330, 132, 462, 329, 132, 165, 135, 164, 164, 132],
  "Shakey-Graves_Family-and-Genus.mp4": [4260, 5051, 7158, 530, 4254, 2938, 5014, 3466, 794, 526, 4259, 263, 265, 195, 65, 264, 265, 264, 264, 263, 830, 260, 266, 264, 527, 526, 167, 99, 231, 33, 758, 296, 528, 265, 265, 262, 231, 33, 266, 263, 265, 263, 32, 231, 264, 265, 264, 164, 363, 264, 264, 265, 297, 528, 528, 795, 261, 263, 264, 265, 263, 265, 529, 295, 528, 264, 264, 231, 264, 132, 430, 528, 263, 264, 264, 265, 264, 530, 228, 297, 299, 230, 530, 826, 228, 132, 165, 230, 296, 264, 266, 263, 266, 261, 264, 265, 231, 34, 1619, 527, 527, 528, 1025, 30, 528, 264, 265, 262, 99, 165, 264, 231, 298, 297, 231, 231, 32, 794, 231, 563, 524, 35, 265, 262, 263, 264, 264, 264, 265, 266, 261, 264, 264, 231, 561, 562, 230, 264, 563, 263, 263, 265, 263, 265, 199, 328, 165, 99, 528, 33, 1056, 763, 261, 263, 265, 531, 264, 261, 32, 266, 262, 528, 264, 530, 263, 263, 264, 264, 266, 526, 264, 795, 987, 429, 432, 295, 527, 530, 494, 564, 260, 198, 33, 67, 231, 264, 494, 33, 527, 531, 32, 493, 34, 230, 298, 496, 33, 263, 197, 33, 33, 264, 264, 265, 266, 31, 231, 296, 132, 331, 66, 529, 229, 231, 66, 495, 297, 233, 31, 264, 264, 266, 196, 34, 32, 298, 98, 663, 525, 199, 66, 231, 33, 34, 494, 263, 267, 31, 265, 232, 261, 34, 197, 34, 263, 33, 132, 132, 760, 563, 263, 263, 263, 266, 266, 260, 563, 230, 32, 133, 395, 231, 231, 33, 1325, 193, 99, 264, 264, 266, 262, 264, 267, 261, 34, 99, 396, 229, 232, 330, 264, 398, 32, 396, 793, 527, 428, 629, 264, 794, 259, 264, 266, 265, 261, 34, 232, 794, 30, 265, 262, 264, 232, 797, 259, 33, 264, 263, 265, 263, 264, 34, 496, 295, 264, 198, 33, 266, 298, 494, 793, 295, 264, 263, 268, 261, 266, 261, 264, 33, 495, 1355, 229, 297, 67, 462, 230, 301, 161, 595, 296, 266, 262, 264, 264, 528, 266, 296, 230, 297, 231, 794, 561, 231, 296, 231, 329, 528, 564, 988, 496, 560, 263, 264, 531, 262, 264, 32, 264, 264, 463, 32, 34, 527, 264, 231, 32, 529, 265, 230, 33, 527, 267, 230, 32, 298, 494, 34, 230, 32, 264, 133, 595, 32, 564, 260, 200, 31, 34, 530, 261, 231, 33, 264, 266, 262, 199, 32, 35, 527, 264, 264, 33, 496, 31, 264, 264, 265, 264, 264, 265, 263, 265, 263, 263, 265, 263, 264, 264, 265, 264, 265, 264, 263, 296, 530, 497, 293, 264, 264, 264, 267, 262, 529, 526, 528, 264, 34, 230, 530, 296, 231, 264, 263, 264, 35, 229, 33, 265, 230, 34, 263, 231, 33, 264, 528, 264, 1057, 528, 297, 230, 561, 400, 98, 526, 296, 264, 265, 263, 265, 133, 98, 296, 528, 266, 32, 499, 291, 234, 526, 528, 35, 493, 264, 264, 263, 529, 33, 263, 300, 231, 264, 263, 531, 523, 530, 264, 130, 398, 560, 264, 496, 31, 231, 165, 134, 263, 263, 231, 297, 532, 527, 134, 128, 527, 298, 494, 532, 526, 265, 30, 234, 31, 264, 230, 34, 263, 132, 133, 265, 262, 264, 264, 34, 494, 267, 264, 262, 330, 362, 928, 260, 528, 530, 229, 265, 296, 231, 299, 262, 529, 263, 264, 529, 263, 265, 267, 161, 99, 265, 232, 296, 329, 2079, 496, 32, 266, 261, 266, 265, 528, 263, 263, 34, 231, 794, 31, 264, 130, 134, 526, 529, 265, 198, 64, 528, 265, 264, 264, 263, 264, 34, 230, 297, 133, 631, 29, 531, 260, 200, 32, 33, 364, 167, 260, 231, 33, 264, 530, 232, 30, 497, 295, 264, 532, 260, 264, 33, 363, 133, 264, 33, 230, 264, 268, 30, 263, 132, 133, 131, 265, 133, 263, 527, 297, 267, 229, 263, 827, 130, 101, 564, 226, 34, 263, 231, 301, 228, 263, 297, 264, 264, 265, 265, 262, 264, 231, 297, 264, 34, 231, 263, 265, 296, 231, 266, 561, 229, 33, 797, 259, 232, 297, 230, 264, 33, 230, 34, 233, 297, 262, 231, 33, 528, 100, 165, 264, 262, 298, 494, 35, 266, 263, 229, 32, 265, 131, 133, 263, 233, 267, 29, 264, 528, 264, 265, 263, 265, 230, 32, 794, 462, 67, 426, 364, 33, 264, 496, 31, 264, 265, 264, 499, 29, 529, 262, 297, 266, 497, 261, 267, 294, 230, 34, 264, 232, 33, 262, 264, 265, 530, 262, 529, 262, 531, 262, 33, 496, 262, 267, 261, 528, 33, 826, 1519, 31, 1057, 793, 231, 33, 2077, 33, 33, 1057, 992, 30, 829, 227, 1060, 29, 763, 1319, 2079, 30, 1852, 261, 33, 8282, 928, 425, 1356, 16926, 4094, 10229]
}

var tempPath = 'temp'
var imagesPath = 'images'

var commandLineArguments = process.argv.slice(2);
commandLineArguments.forEach(function (arg) {
  var args = arg.split("=")
  if (args.length > 1) {
    switch (args[0]) {
      case "-tempPath":
        tempPath = args[1]
        break;
      case "-imagesPath":
        imagesPath = args[1]
        break;
    }
  }
})

console.log("starting reading from queue")
jobs.process('slideshows', function (job, done) {
  try {
    var urls = job.data.urls;
    var token = job.data.token;
    var songPath = job.data.songPath;
    console.log("processing token " + job.data.token)
    facebook.getPhotos({token: token, imagesPath: imagesPath}).then(function () {
      console.log("get photos complete")
      slideshow.create({
        track: "./audio/" + songPath,
        times: timesMap[songPath],
        imagesPath: imagesPath,
        tempPath: tempPath
      }).then(function () {
        console.log("slideshow complete")
        facebook.uploadVideo({outputFile: tempPath + '/output.mp4', token: job.data.token}).then(function (data) {
          console.log("success " + job.data.token)
          return done()
        })
      })
    }).fail(function (err) {
      console.log("HANDLED_ERROR " + err)
      return done();
    })
  } catch (err) {
    console.log("UNHANDLED_ERROR " + err)
    return done()
  }
})


