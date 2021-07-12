/**
 * 查询触发节点全链路
 * @param {*} links 关系元数据
 * @param {*} node 触发节点
 */
function getFullLinkNodes (links, node) {
  if (!links || !links.length || !node) return [];

  const smap = {};
  const tmap = {};

  links.forEach((k, index) => {
    const {source, target} = k;
    if (smap[source]) {
      smap[source].push(index);
    } else {
      smap[source] = [index];
    }

    if (tmap[target]) {
      tmap[target].push(index);
    } else {
      tmap[target] = [index];
    }
  });

  console.log('smap', smap);
  console.log('tmap', tmap);

  let rindexs = [];
  const getAllIndexs = (key = 's', id) => {
    const map = key === 's' ? smap : tmap;
    const ck = key === 's' ? 'target' : 'source';
    const cindexs = map[id] || [];

    cindexs.forEach(index => {
      if (!rindexs.includes(index)) {
        const clink = links[index];
        const cid = clink[ck];
        rindexs = [...rindexs, index];
        getAllIndexs(key, cid);
      }
    });
  };

  getAllIndexs('s', node.id);
  getAllIndexs('t', node.id);

  console.log('rindexs', rindexs);

  return rindexs.map(index => links[index]);
}

var edges = [
  {
    source: '1',
    target: '2',
  },
  {
    source: '1',
    target: '3',
  },
  {
    source: '2',
    target: '4',
  },
  {
    source: '2',
    target: '5',
  },
  {
    source: '3',
    target: '6',
  },
  {
    source: '3',
    target: '7',
  },
  {
    source: '4',
    target: '8',
  },
  {
    source: '4',
    target: '9',
  },
  {
    source: '5',
    target: '10',
  },
  {
    source: '6',
    target: '10',
  },
  {
    source: '7',
    target: '11',
  },
  {
    source: '7',
    target: '12',
  },
  {
    source: '8',
    target: '20',
  },
  {
    source: '8',
    target: '16',
  },
  {
    source: '8',
    target: '13',
  },
  {
    source: '10',
    target: '13',
  },
  {
    source: '10',
    target: '14',
  },
  {
    source: '11',
    target: '19',
  },
  {
    source: '12',
    target: '15',
  },
  {
    source: '13',
    target: '16',
  },
  {
    source: '13',
    target: '17',
  },
  {
    source: '14',
    target: '18',
  },
  {
    source: '14',
    target: '19',
  },
  {
    source: '15',
    target: '19',
  },
  {
    source: '16',
    target: '20',
  },
  {
    source: '16',
    target: '21',
  },
  {
    source: '17',
    target: '22',
  },
  {
    source: '18',
    target: '22',
  },
  {
    source: '19',
    target: '22',
  },
  {
    source: '19',
    target: '25',
  },
  {
    source: '20',
    target: '23',
  },
  {
    source: '22',
    target: '23',
  },
  {
    source: '23',
    target: '24',
  },
  {
    source: '23',
    target: '25',
  },
  {
    source: '24',
    target: '26',
  },
  {
    source: '25',
    target: '26',
  },
];
console.log('edges', edges);
var selectLinks = getFullLinkNodes(edges, {id: '10'});
console.log(selectLinks);
