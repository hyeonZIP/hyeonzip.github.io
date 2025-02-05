---
title: "[BOJ] 1260번: DFS와 BFS [JAVA]"
date: "2025-01-31T22:12:03.284Z"
thumbnail:
tag: BOJ,DFS,BFS
series: PS,BOJ
---

# 0. 문제 링크

[>>[BOJ] 1260번: DFS와 BFS<<](https://www.acmicpc.net/problem/1260)


# 1. 문제 이해

BFS와 DFS에 대한 기초 지식 문제


# 2. 자료구조,알고리즘 선택

처음 풀이에서는 dfs = 재귀함수, bfs = queue로 공식처럼 생각했기에 별 생각없었다.

> Q. dfs는 재귀함수 말고 다른 방법은 없나?
>> A. stack을 이용해서 구현이 가능하다. 다만,  
>> [>>해당 블로그<<](https://vanslog.io/posts/language/java/why-use-deque-instead-of-stack/) 에서 설명하는 것을 간단히 표현하면,   
>> Vector: 동기화 O, 쓰레드 안전 O, 속도 느림   
>> ArrayList: 동기화 X, 쓰레드 안전 X, 속도 빠름    
>> *Stack은 Vector를 상속받아 만들어짐  
>> 따라서 Deque(양방향 큐)를 사용해 stack 구현
> Q. BFS는 queue 말고 다른 방법은 없나?
>> A. 얕게 검색을 한건지 몰라도 현재는 queue가 일반적이다.

# 3. 시간복잡도 계산

입력값 for문 + dfs의 for문 + bfs의 for문 = O(N+M) + O(N+M) + O(N+M) 임으로 3*O(N+M)...

인줄 알았으나 시간 복잡도의 표기 이유는 입력 크기가 매우 커졌을 때의 성능을 표기하기위한 것이기 때문에 

상수값은 무시하여 O(N+M)으로 계산을 마무리 할 수 있다.

# 4. 다른 풀이

인접 행렬과 인접 리스트 라는 용어를 알게 되었다.

`int[][] map;` << 이게 인접 행렬 `List<Integer>[] adj;` << 이것이 인접 리스트

기존에 알고 있던 인접 행렬의 원리는 map[1][2] 로 바로 이동이 가능하다면

인접 리스트에서는 adj[1]로 이동해서 for(int n : adj[1])을 통해 2가 있는지 확인해야한다.

따라서 이번 문제와 같이 희소 그래프에서는 인접 리스트로 구현해도 가능하지만

미로 찾기와 같은 map의 크기가 커질 경우 인접 행렬을 이용해야 한다.

또, 기존에는 방문 배열을 초기화해 주기 위해 `visited = new boolean[N+1]` 으로 새 인스턴스를 생성했다면

`Arrays.fill(visited, false);`를 이용해 chill 하게 초기화 해줄 수 있다.

# 5. 전체 풀이
```
package problemSolving;

/*
 * 1. DFS / BFS 사용
 * 2. 정점 번호가 작은 것을 먼저 방문
 */

import java.util.*;
import java.io.*;

public class Main {
	
	static int N;
	static int M;
	static int V;
	
	static int[][] map;
	
	static boolean[] visited;
	
	static String result;
	
	static StringBuilder sb = new StringBuilder();
	
	static Queue<Integer> q = new LinkedList<>();
	
	public static void main(String[] args) throws IOException{
		
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		
		N = Integer.parseInt(st.nextToken());//정점 개수
		M = Integer.parseInt(st.nextToken());//간선 개수
		V = Integer.parseInt(st.nextToken());//시작 정점 번호
		
		map = new int[N+1][N+1];//정점 간 연결 정보
		visited = new boolean[N+1];//정점 방문 정보
		
		
		for(int i=0; i<M; i++) {
			st = new StringTokenizer(br.readLine());
			int x = Integer.parseInt(st.nextToken());
			int y = Integer.parseInt(st.nextToken());
			
			map[x][y] = 1;
			map[y][x] = 1;
		}
		dfs(V);
		sb.append("\n");
		visited = new boolean[N+1];
//		Arrays.fill(visited, false);
		q.offer(V);
		visited[V] = true;
		bfs();
		System.out.println(sb);
	}
	
	public static void dfs(int startNode) {
		sb.append(startNode).append(" ");
		visited[startNode] = true;
		
		for(int i=1; i<=N; i++) {
			
			if(map[startNode][i] == 1 && !visited[i]) {
				dfs(i);
			}
		}
	}
	
	public static void bfs() {
		
		while(!q.isEmpty()) {
			
			int startNode = q.poll();
			
			sb.append(startNode).append(" ");
			
			for(int i=1; i<=N; i++) {
				if(map[startNode][i] == 1 && !visited[i]) {
					q.offer(i);
					visited[i] = true;
				}
			}
        }
	}
}
```