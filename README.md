<h1>learn redis</h1>
<p>redis is a key-value store</p>
<p>it is a no-sql database</p>
<p>it is an in-memory database</p>
<h1>IMPORTANT COMMANDS</h1>
<h2>1)TERMINAL COMMANDS</h2>
<p>redis-server => to start the redis server</p>
<p>redis-cli => to start the redis client && access redis</p>
<p>quit => to exit the redis client</p>
<h2>2)REDIS COMMANDS</h2>
<p>SET key value => to set a key-value pair</p>
<p>GET key => to get the value of a key</p>
<p>DEL key => to delete a key</p>
<p>EXISTS key => to check if a key exists</p>
<p>KEYS * => to get all the keys</p>
<p>FLUSHALL => to delete all the keys</p>
<p>clear => to clear the terminal</p>
<p>ttl key => to get the time to live of a key</p>
<ul>ttl key returns
<li>-1 if the key does not have an expire time</li>
<li>-2 if the key does not exist key dead "expired"</li>
<li>the time to live of the key in seconds</li>
</ul>
<p>EXPIRE key time => to set the time to live of a key</p>
<p>SETEX key time value => to set the time to live of a key and set the value</p>
<h1>redis data types</h1>
<h2>1)list "it will be sooooo useful when it comes to LRU && LFU , build pile/file logics"</h2>
<p>LPUSH key value => to add a value to the left of the list</p>
<p>RPUSH key value => to add a value to the right of the list</p>
<p>LPOP key => to remove a value from the left of the list and return it</p>
<p>RPOP key => to remove a value from the right of the list and return it</p>
<p>LRANGE key start stop => to get the values of the list from start to stop "small trick : if start = 0 and stop = -1 you will get all the values of the list"</p>
<p>LLEN key => to get the length of the list</p>
<h2>2)set "array of unique elements"</h2>
<p>SADD key value => to add a value to the set</p>
<p>SMEMBERS key => to get all the values of the set</p>
<p>SISMEMBER key value => to check if a value exists in the set</p>
<p>SREM key value => to remove a value from the set</p>
<p>SCARD key => to get the number of elements in the set</p>
<h2>3)hash "json obgect without nested objects"</h2>
<p>HSET key field value => to set a field-value pair</p>
<p>HGET key field => to get the value of a field</p>
<p>HGETALL key => to get all the field-value pairs</p>
<p>HDEL key field => to delete a field-value pair</p>
<p>HEXISTS key field => to check if a field exists</p>
<h1>NODE / EXPRESS / REDIS</h1>





<h1>IMPORTANT NOTES</h1>
<p>redis returns the values as strings in most of cases</p>
