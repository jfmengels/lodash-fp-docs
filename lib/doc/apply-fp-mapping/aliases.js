var _ = require('lodash'),
    mapping = require('../../../fp/_mapping'),
    util = require('docdown/lib/util'),
    Alias = require('docdown/lib/alias.js');

/* getTag and getValue are copied verbatim from docdown,
and getAliasesIncludingRamdaAliases has just a few changes from
docdown's getAliases */


/**
 * Gets an `entry` tag by `tagName`.
 *
 * @private
 * @param {Object} entry The entry to inspect.
 * @param {string} tagName The name of the tag.
 * @returns {null|Object} Returns the tag.
 */
function getTag(entry, tagName) {
    var parsed = entry.parsed;
    return _.find(parsed.tags, ['title', tagName]) || null;
}

/**
 * Gets an `entry` tag value by `tagName`.
 *
 * @private
 * @param {Object} entry The entry to inspect.
 * @param {string} tagName The name of the tag.
 * @returns {string} Returns the tag value.
 */
function getValue(entry, tagName) {
    var parsed = entry.parsed,
        result = parsed.description,
        tag = getTag(entry, tagName);

    if (tagName == 'alias') {
        result = _.get(tag, 'name');

        // Doctrine can't parse alias tags containing multiple values so extract
        // them from the error message.
        var error = _.first(_.get(tag, 'errors'));
        if (error) {
            result += error.replace(/^[^']*'|'[^']*$/g, '');
        }
    }
    else if (tagName == 'type') {
        result = _.get(tag, 'type.name');
    }
    else if (tagName != 'description') {
        result = _.get(tag, 'name') || _.get(tag, 'description');
    }
    return tagName == 'example'
        ? _.toString(result)
        : util.format(result);
}


const getAllAliases = entry => {
    const aliasFromMapping = _.findKey(mapping.aliasToReal, val => val === entry.getName())
    const normalDocDownAliases = _(getValue(entry, 'alias'))
        .split(/,\s*/)

    return _.uniq([aliasFromMapping, ...normalDocDownAliases])
}

/**
 * Extracts the entry's `alias` objects as well as its ramda alias (if existent).
 *
 * @memberOf Entry
 * @param {number} index The index of the array value to return.
 * @returns {Array|string} Returns the entry's `alias` objects.
 */
function getAliasesIncludingRamdaAliases(index) {
    if (this._aliases === undefined) {
        var owner = this;
        this._aliases = _(getAllAliases(this))
            .compact()
            .sort(util.compareNatural)
            .map(function (value) { return new Alias(value, owner); })
            .value();
    }
    var result = this._aliases;
    return index === undefined ? result : result[index];
}

module.exports = getAliasesIncludingRamdaAliases