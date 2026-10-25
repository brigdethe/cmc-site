import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldSaveData } from './data-policy.js';

test('explicit Data Saver always avoids automatic background media',()=>{
 assert.equal(shouldSaveData({saveData:true,effectiveType:'4g',downlink:10}),true);
});
test('slow effective connections or limited bandwidth conserve data',()=>{
 for(const effectiveType of ['slow-2g','2g','3g'])assert.equal(shouldSaveData({effectiveType}),true);
 assert.equal(shouldSaveData({effectiveType:'4g',downlink:.8}),true);
});
test('normal and unavailable connection information preserve normal behavior',()=>{
 assert.equal(shouldSaveData({saveData:false,effectiveType:'4g',downlink:10}),false);
 assert.equal(shouldSaveData({}),false);
 assert.equal(shouldSaveData(null),false);
});
